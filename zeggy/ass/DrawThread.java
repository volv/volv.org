//DrawThread.java
//The Main gameloop
//az23
import javax.swing.*;
import java.lang.*;
import java.awt.*;
import java.util.ArrayList;
class DrawThread implements Runnable {
	final boolean fuckGiven = false;
	boolean[] controls;				//From the keyboard input thread
	SinTable st;					//For faster trig
	MadnessEngine me;				//Actually does the drawing
	JFrame mainWin;
	ArrayList <ZPolygon> drawList;	//List of everything to draw
	ArrayList <ZPolygon> bglist;  	//Holds objects to be drawn as background layer
	ArrayList <ZPolygon> mainlist;	//Holds objects to be drawn as middle layer
	ArrayList <ZPolygon> fglist;	//Holds objects to be drawn in foreground
	ArrayList <ZPolygon> bulletlist;//The Bullets
	Starfield sf;
	Player player;					//Decided to keep the player object separate	
	boolean tripmode;
		
	int lastShot;
	int score;
	public void run() {
		tripmode = true;
		lastShot = 19;		//If player doesn't shoot for > 414 days this will overflow
		score = 0 ;
		int dispScore =0;
		bulletlist = new ArrayList();
		while(!fuckGiven){ 		//le mainloop
			long t1 = System.currentTimeMillis();
			lastShot ++;		//one less frame til player can shoot
			drawList.clear();	//Throw away the old drawlist
			doBackground();		//tripmode		
			movePlayer();		//handle input and player object
			moveBullets();		//handle bullets
			moveAsteroids();	//handle asteroids
			if(dispScore < score){
				dispScore ++;
			}
			drawList.addAll(new Scoreboard(640,0,1,dispScore).getScoreboard()); //show the sick-ass 7seg retro scoreboard
			me.setdrawList(new ArrayList(drawList)); //shouldn't cause reference/value problems.
			long t2 = System.currentTimeMillis();
			try{
				mainWin.repaint();
				t2 = System.currentTimeMillis();
				Thread.sleep(16-(t2-t1));// Frame delay(ms)				
			}
			catch(Exception e){
				//U WOT M8
			}
			
		}
	}
	
	
	//Scale the stuff in the background list
	//Look at your hands...
	//public ZPolygon(int[] xCoords, int[] yCoords, int xOffset, int yOffset, int rotation, double xScale, double yScale, Color color, boolean bg)
	public void doBackground(){
		int[]x = {-1,1,1,-1};
		int[]y = {1,1,-1,-1};
		drawList.add(new ZPolygon(x,y,320,240,0,320,240,new Color(0,0,0),false));
		drawList.addAll(sf.getStarfield());
		sf.doMove();	
        		
	}
	
	//Reads controls and moves player
	public void movePlayer(){
		if(controls[0]){//up	
			player.speedUp(); 
		}
		if(controls[1]){//down
			if(lastShot > 20){ // Delay between shots (in frames)
				bulletlist.add(new Bullet(5,- player.angle,player.xpos,player.ypos));
				lastShot = 0;
				}
		} 
		if(controls[2]){//left
			player.turnLeft();; 
		}
		if(controls[3]){//right
				player.turnRight(); 
		}
		player.doMove(st);
		drawList.add(player);
	}
	
	//Moves each bullet and does collision detection and handling with the asteroids
	public void moveBullets(){
		for(int i=0; i< bulletlist.size(); i++){		// 	for each bullet
				bulletlist.get(i).doMove(st);
				//remove bullets off screen before the coords overflow(Ages) or we run out of memory(Ages)
				//more likely we just end up in slideshow mode.
				if(bulletlist.get(i).xpos > 680 || bulletlist.get(i).xpos < -40 || bulletlist.get(i).ypos < -40 || bulletlist.get(i).ypos > 520){
					bulletlist.remove(i);
					i--;	//What was in space i+1 is now in space i, bulletlist.size() is also --
				}
				if(i >= 0){// Else we crash if we just removed the last bullet
					for(int j = 0; j <mainlist.size(); j++){	//  for each asteroid
						if(bulletlist.get(i).collidesWith(mainlist.get(j).getTransformedPoly(st),st)|| mainlist.get(j).collidesWith(bulletlist.get(i).getTransformedPoly(st),st)){
							bulletlist.remove(i);
							
							Asteroid t = (Asteroid) mainlist.get(j);
							t.hp --;
							if(t.hp<=0){
								mainlist.remove(j);
								score += t.level *50;
								if(t.level>1){
								mainlist.add(new Asteroid(t.xpos,t.ypos,t.level-1,t.heading+90));
								mainlist.add(new Asteroid(t.xpos,t.ypos,t.level-1,t.heading-90));
								}
							}
							j = mainlist.size();				//Stop
							i--;
						}
					}
				}
			}
		drawList.addAll(bulletlist);
	}
	//Moves the asteroids, does collision detection between asteroids and asteroids and asteroids and player
	//fish and and and and and chips.
	public void moveAsteroids(){
		for(int i=0; i< mainlist.size(); i++){						 	//For each asteroid 
			if(mainlist.get(i).getClass().toString().equals("class Asteroid")){
				Asteroid temp = (Asteroid) mainlist.get(i);
				if(player.collidesWith(temp.getTransformedPoly(st),st)){ //Do we Kill the player?
					player.xpos = 320;
					player.ypos = 240;
					player.colour = new Color(255,255,0);
				}
				for(int j = i+1; j < mainlist.size(); j++){					//For each Asteroid after this one
					if(mainlist.get(j).getClass().toString().equals("class Asteroid")){ // Don't need this at present
						Asteroid temp2 = (Asteroid)mainlist.get(j);
						if(temp.collidesWith(temp2.getTransformedPoly(st),st)){ //We Crashed, how thoughtless.
							physicsCollision(temp,temp2,st);
						}
					}
				}
						
				temp.doMove(st);
				drawList.add(temp);
			}	
		}
	}
	
	//Constructor
	//Need JFrame to draw to and ArrayList of stuff to draw
	public DrawThread(JFrame main, ArrayList <ZPolygon> dl,boolean[] con, SinTable sintable){
		controls = con;
		mainWin = main;
		drawList = dl;
		mainWin.setVisible(true);
		MadnessEngine me = new MadnessEngine(new ArrayList <ZPolygon>());
		mainWin.add(me);
		st = sintable;
	}
	
	public DrawThread(JFrame main, int mode, boolean[] con, SinTable sintable){
		controls = con;
		mainWin = main;
		st = sintable;
		int[] x;
		int[] y;
		if (mode == 1){
			x = new int[3];
			y = new int[3];
			x[0] = 0;
			x[1] = 1;
			x[2] = -1;
			y[0] = 1;
			y[1] = 0;
			y[2] = 0;
		}
		else{
			x = new int[4];
			y = new int[4];
			x[0] = -1;
			x[1] = 1;
			x[2] = 1;
			x[3] = -1;
			y[0] = 1;
			y[1] = 1;
			y[2] = -1;
			y[3] = -1;
		}
		drawList = new ArrayList<ZPolygon>();
		bglist = new ArrayList<ZPolygon>();
		mainlist = new ArrayList<ZPolygon>();
		fglist = new ArrayList<ZPolygon>();
		//initialise tripmode
		/* for(int i =100; i>0;i--){
			if(i%2 == 0){
				bglist.add(new ZPolygon(x,y,320,240,45+(i*5),100 - i*10,200 - i*10,new Color(0,0,0),true));
			}
			else{
				bglist.add(new ZPolygon(x,y,320,240,45+(i*5),100 - i*10,200 - i*10,new Color(255,255,255),true));
			}
		} */
		
		player = new Player(x,y,320,240,0,10,10,new Color(255,0,0),false);
		sf = new Starfield(320,240,100,st);
		mainlist.add(new Asteroid(10,10,1,90));
		mainlist.add(new Asteroid(100,10,2,45));
		mainlist.add(new Asteroid(400,10,3,67));
		mainlist.add(new Asteroid(600,400,1,285));
				
		me = new MadnessEngine(drawList);
		mainWin.add(me);
		
		
	}
	//Almost just about kinda works (tm)
	//2nd go
	public void physicsCollision(Asteroid a, Asteroid b, SinTable st){
		//I just used the "word" math. This whole "America" thing needs sorted.
		int heada = a.heading;
		int headb = b.heading;
		int spda  = a.speed;
		int spdb  = b.speed;
		
		if(spda<0){
			spda = 0 - spda;
			heada = a.fixAngle(heada + 180);
		}
		if(spdb<0){
			spdb = 0 - spdb;
			headb = a.fixAngle(headb + 180);
		}
		//need to find the angle between the Asteroids
		//simple bounce
		
		//translate both so a is on origin
		int xoff = a.xpos;
		int yoff = a.ypos;
		int boffx = b.xpos - xoff;
		int boffy = b.ypos - yoff;
		//find b's angle from origin
		int cang;
		if (boffy == 0){
			cang = 90;
			//System.out.println("boffy ==0\tboffx|boffy =\t"+boffx+"|"+boffy);
		}
		else{
			cang = (int)Math.round(Math.toDegrees(Math.atan(boffx/boffy)));
			//System.out.println("boffy =/=0\tboffx|boffy|cang =\t"+boffx+"|"+boffy+"|"+cang);
			//System.out.println("boffx/boffy|asin(boffx/boffy)=\t"+(boffx/boffy)+"|"+Math.asin(boffx/boffy));
			//System.out.println("toDegrees() =\t"+ Math.toDegrees(Math.atan(boffx/boffy)));
		}
		
		b.heading = b.fixAngle(cang);
		a.heading = a.fixAngle(180+cang);
		a.doMove(st);
		b.doMove(st);
		
		
	}
}
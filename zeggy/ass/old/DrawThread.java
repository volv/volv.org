//DrawThread.java
//Performs per-frame drawing operations
//az23
import javax.swing.*;
import java.lang.*;
import java.awt.*;
import java.util.ArrayList;
class DrawThread implements Runnable {
	boolean[] controls;		//From the keyboard input thread
	SinTable st;			//For faster trig
	MadnessEngine me;		//Actually does the drawing
	JFrame mainWin;
	ArrayList <ZPolygon> drawList;	//List of everything to draw
	ArrayList <ZPolygon> bglist;  	//Holds objects to be drawn as background layer
	ArrayList <ZPolygon> mainlist;	//Holds objects to be drawn as middle layer
	ArrayList <ZPolygon> fglist;	//Holds objects to be drawn in foreground
	Player player;					//Decided to keep the player object seperate	
	
	public void run() {
		
		
		while(true){ //le mainloop
			     //Empty the Drawlist, append the 3 sub-lists creating the new drawlist.
			drawList = new ArrayList <ZPolygon>();
			
			for(int i=0; i < bglist.size(); i++){	//for each item in the background
													//Scale 'er up
				bglist.get(i).setScale(bglist.get(i).scaleX +1,bglist.get(i).scaleX +1);
				
				if(bglist.get(i).scaleX>500){ //too big
					bglist.get(i).setScale(1,1);
					bglist.add(bglist.get(i));
					bglist.remove(i);
				}
				
				drawList.add(bglist.get(i));
			}
			
			for(int i=0; i< mainlist.size(); i++){						 //For each Asteroid
				Asteroid temp = (Asteroid) mainlist.get(i);
				
				
				if(player.collidesWith(temp.getTransformedPoly(st),st)){ //Do we Kill the player?
					player.xpos = 320;
					player.ypos = 240;
					player.colour = new Color(255,255,0);
				}
				for(int j = i+1; j < mainlist.size(); j++){				 //For each Asteroid after this one
					Asteroid temp2 = (Asteroid)mainlist.get(j);
					if(temp.collidesWith(temp2.getTransformedPoly(st),st)){ //We Crashed, how thoughtless.
						physicsCollision(temp,temp2,st);
					}
				
				}
				
				temp.doMove(st);
				drawList.add(temp);
				
			}
			
			//For the player
			if(controls[0]){//up	
				player.speedUp(); 
			}
			if(controls[1]){//down
			} 
			if(controls[2]){//left
				player.turnLeft();; 
			}
			if(controls[3]){//right
				player.turnRight(); 
			}
			player.doMove(st);
			drawList.add(player);
			
			
			for (int i=0; i < fglist.size();i++){//For each item in foreground 
				drawList.add(fglist.get(i));
			}
			
			me.setdrawList(new ArrayList(drawList)); //shouldn't cause reference/value problems.
			try{
				Thread.sleep(16);// Frame delay(ms)
				
				mainWin.repaint();
				
			}
			catch(Exception e){
			
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
		for(int i =50; i>0;i--){
			if(i%2 == 0){
				bglist.add(new ZPolygon(x,y,320,240,45+(i*5),100 - i*10,200 - i*10,new Color(0,0,0),true));
			}
			else{
				bglist.add(new ZPolygon(x,y,320,240,45+(i*5),100 - i*10,200 - i*10,new Color(255,255,255),true));
			}
		}
		player = new Player(x,y,320,240,0,10,10,new Color(255,0,0),false);
		
		mainlist.add(new Asteroid(10,10,1,90));
		mainlist.add(new Asteroid(100,10,2,45));
		mainlist.add(new Asteroid(400,10,3,67));
		mainlist.add(new Asteroid(600,400,1,285));
		
		fglist.addAll(new Scoreboard(640,0,1,31337).getScoreboard());
		
		
				
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
			System.out.println("boffy ==0\tboffx|boffy =\t"+boffx+"|"+boffy);
		}
		else{
			cang = (int)Math.round(Math.toDegrees(Math.atan(boffx/boffy)));
			System.out.println("boffy =/=0\tboffx|boffy|cang =\t"+boffx+"|"+boffy+"|"+cang);
			System.out.println("boffx/boffy|asin(boffx/boffy)=\t"+(boffx/boffy)+"|"+Math.asin(boffx/boffy));
			System.out.println("toDegrees() =\t"+ Math.toDegrees(Math.atan(boffx/boffy)));
		}
		
		b.heading = b.fixAngle(cang);
		a.heading = a.fixAngle(180+cang);
		a.doMove(st);
		b.doMove(st);
		
		
	}
}
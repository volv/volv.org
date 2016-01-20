//Starfield.java
//Creates a starfield effect
//like the win 95 screensaver
//lol remember screensavers?
//az23
import java.util.ArrayList;
import java.lang.Math;
import java.awt.Color;
public class Starfield{
	int[]x = {0,7,31,7,0,-7,-31,-7};	//Stole this from the bullet class
	int[]y = {-31,-7,0,7,31,7,0,-7};	//
	int vpx;
	int vpy;
	int density;
	SinTable st;
	ArrayList <ZPolygon> stars;
	
	//Create a starfield
	public Starfield(int xpos, int ypos, int d, SinTable sintable){
		vpx = xpos;
		vpy = ypos;
		density = d;
		st = sintable;
		stars = new ArrayList();
		for(int i=0; i < density; i++){ //create the stars 
			stars.add(newStar());
		}			
				
	}
	
	//Create a new star with randomised everything
	public ZPolygon newStar(){
		int a  = (int)Math.round(Math.random()*360);
		double s = Math.random()/10;
		int r = 255 - (int)Math.round(Math.random()*128);
		int b = 255 - (int)Math.round(Math.random()*128);
		int g = 255 - (int)Math.round(Math.random()*128);
		return new ZPolygon(x,y,vpx,vpy,a,s,s,new Color(r,b,g),false); 
	}
	
	//Move the starfield
	public void doMove(){
		for(int i =0; i< stars.size();i++){ 	//for each star
			//move star away from vp and scale up slightly
			if(stars.get(i).scaleX > 0.5){	//Don't get too big and look shit
				stars.remove(i);			//Should be based on distance from vp 
				stars.add(i,newStar());
				
			}
			int xpos = stars.get(i).xpos;
			int ypos = stars.get(i).ypos;
			int angle = stars.get(i).angle;
			stars.get(i).scaleX = stars.get(i).scaleX * 1.02;
			stars.get(i).scaleY = stars.get(i).scaleY * 1.02;
			stars.get(i).xpos = xpos - (int) Math.round(6 * st.sin(angle));
			stars.get(i).ypos = ypos + (int) Math.round(6 * st.cos(angle));
		}
		
		
	}
	
	public ArrayList <ZPolygon> getStarfield(){
		
		return stars;
	}
	
}
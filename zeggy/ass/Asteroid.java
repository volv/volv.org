//Asteroid as in the game Asteroids
//Part of the Madness Engine project
//Requires a sin/cos lookup table
//az23
import java.awt.Polygon;
import java.util.Arrays;
import java.awt.Color;

public class Asteroid extends ZPolygon{
	//The points for the polygon
	int[]x = {8,25,15,24,20,-10,-17,-22,-17,-7,2};
	int[]y = {-20,-11,-4,-2,8,11,7,-1,-11,-4,-12};
	int speed = 0;
	int heading; //Direction of motion
	int level = 1;
	int hp = 2;
	
	//Create a new asteroid, speed, hp and size scale with level
	//0.414 is root2 
	public Asteroid(int xOffset,int yOffset,int size,int head){
		heading = fixAngle(head);
		xpoints = x;
		ypoints = y;
		xpos = xOffset;
		ypos = yOffset;
		level = size;
		angle = 0;
		hp = (2*level);
		scaleX = 1 + (0.414 * level);
		scaleY = 1 + (0.414 * level);
		colour = new Color(45,98,65);
		background = false;
		speed = (int)Math.round(6 - (0.414 * level));
	
	}
	
	
	//Called per-frame to move the Asteroid
	public void doMove(SinTable st){
		
		if(speed == 0){
			//this should never happen
		}
		else{
			
			xpos = xpos - (int) Math.round(speed * st.sin(heading));
			ypos = ypos - (int) Math.round(speed * st.cos(heading));
			angle = angle + 1;
			fixAngle();
			
		//negative speed makes heading wrong
		if(xpos > 640){
			xpos = 640;
			heading= fixAngle(heading +180);
		}
		if(ypos > 480){
			ypos = 480;
			heading= fixAngle(heading +180);
		}
		
		if(xpos < 0){
			xpos = 0;
			heading= fixAngle(heading +180);
		}
		if(ypos <0){
			ypos = 0;
			heading= fixAngle(heading +180);
		}
		}
	}


}
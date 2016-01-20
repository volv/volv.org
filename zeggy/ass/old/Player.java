import java.awt.Polygon;
import java.util.Arrays;
import java.awt.Color;
import java.lang.Math;

public class Player extends ZPolygon {
		int[]x = {0,10,0,-10};
		int[]y = {10,-10,-5,-10};
		int speed = 0;
		//int xpos = 320;
		//int ypos = 240;
		//double scaleX = 2;
		//double scaleY = 2;
		//double rotation = 0;
		//Color colour = new Color(255,0,0);
		//boolean background = false;
	
	
	
	public Player(int[] xCoords, int[] yCoords, int xOffset, int yOffset, int rotation, double xScale, double yScale, Color color, boolean bg){
		
		super(xCoords,yCoords,320,240,0,2,2,color,false);
		xpoints = x;
		ypoints = y;
	}
	
	public void speedUp(){
		if(speed <16){
			speed = speed + 2;
		}
	}
	
	public void turnLeft(){
		angle = angle -2;
		
		fixAngle();
		
	}
	
	public void turnRight(){
		
		angle = angle +2;
		
		fixAngle();
		
	}
	
	
	public void doMove(SinTable st){
		if(speed==0){
		//do nothing
		}
		else{
			xpos = xpos - (int) Math.round(speed * st.sin(angle));
			ypos = ypos + (int) Math.round(speed * st.cos(angle));
			speed = speed -1;
		}
		if(xpos > 640){
			xpos = 640;
			speed = 0;
		}
		if(ypos > 480){
			ypos = 480;
			speed = 0;
		}
		
		if(xpos < 0){
			xpos = 0;
			speed = 0;
		}
		if(ypos <0){
			ypos = 0;
			speed = 0;
		}
		
	}

}
//ZPolygon.java 
//Adds Transformation and colour data to the standard Polygon object
//All angles must be in degrees and 360 > x <=0
//az23
import java.awt.Polygon;
import java.util.Arrays;
import java.awt.Color;


public class ZPolygon extends Polygon{
	int xpos;
	int ypos;
	int angle;
	double scaleX;
	double scaleY;
	Color colour;
	boolean background;//nolonger used for anything
	
	//Constructor w/out points for classes which store their own polys
	//Also only one scale factor
	public ZPolygon(){
		background = false;
		fixAngle();
	}
	public ZPolygon(int xOffset, int yOffset, int rotation, double scale, Color color){
		xpos = xOffset;
		ypos = yOffset;
		angle = rotation;
		scaleX = scale;
		scaleY = scale;
		colour = color;
		background = false;
		fixAngle();
	}
	
	//Bigwan
	public ZPolygon(int[] xCoords, int[] yCoords, int xOffset, int yOffset, int rotation, double xScale, double yScale, Color color, boolean bg){
		xpoints = xCoords;
		ypoints = yCoords;
		xpos = xOffset;
		ypos = yOffset;
		angle = rotation;
		scaleX = xScale;
		scaleY = yScale;
		colour = color;
		background = bg;
		fixAngle();
	}
	
	public Polygon getTransformedPoly(SinTable st){
		int[] x = Arrays.copyOf(xpoints,xpoints.length);
		int[] y = Arrays.copyOf(ypoints,ypoints.length);
		//Scale
		//Rotate
		//translate
		for(int i = 0; i < x.length; i++){ //for each point
		
			x[i] = (int) Math.round(x[i]* scaleX);
			y[i] = (int) Math.round(y[i]* scaleY);
			//x'=xcos(theta)-ysin(theta)
			//y'=xsin(theta)+ycos(theta)
			//If this is borked, try a more verbose rewrite
			int tx = (int) Math.round( (x[i] * st.cos(angle)) - (y[i] * st.sin(angle)) );
			y[i] =   (int) Math.round( (x[i] * st.sin(angle)) + (y[i] * st.cos(angle)) );
			x[i] = tx; 
				
			x[i] = x[i] + xpos;
			y[i] = y[i] + ypos;
			
		}
		
		return new Polygon(x,y,x.length);
	
	}
	//empty: objects that wish to move should override this
	public void doMove(SinTable st){
	}
	
	//Detect collisions
	//This is not perfect
	//I believe basing the whole thing on line intersection would be better
	//Transformed poly should be passed in here
	public boolean collidesWith(Polygon other, SinTable st){
		Polygon ourPoints = this.getTransformedPoly(st); // Need the transformed points of this polygon
		
		if(other.contains(this.xpos,this.ypos)){// Ez mode 
			return true;
		}
		//For each of this polygons screen points
		for(int i=0; i< ourPoints.npoints;i++){
			if(other.contains(ourPoints.xpoints[i],ourPoints.ypoints[i])){ //other poly contains our point
				return true;
			}
			
		}
		return false;
	}
	
	
	public int fixAngle(int a){
		while(a < 0){
			a = a + 360;
		}
		while(a >= 360){
			a = a - 360;
		}
			
		return a;
	
	}
	public void fixAngle(){
		while(angle < 0){
			angle = angle + 360;
		}
		while(angle >= 360){
			angle = angle - 360;
		}
	}
	
	
	//Setter methods nothing really to see
	public void setColour(int r, int g, int b){
		colour = new Color(r,b,g);
			
	}
	
	public void setScale(double x, double y){
		scaleX = x;
		scaleY = y;
	}
	
	public void setPosition(int x, int y){
		xpos = x;
		ypos = y;
	}
	
	public void setAngle(int a){
		if(a > 360){
			a = a - 360;
		}
		
		if(a < 0){
			a = a + 360;		
		}
		angle = a;
	}
	
}

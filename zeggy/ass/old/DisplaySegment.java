import java.awt.Polygon;
import java.util.Arrays;
import java.awt.Color;

//A single segment for a 7seg Display
//az23
public class DisplaySegment extends ZPolygon{
	//The points for the polygon
	int[]x = {-9,9,12,9,-9,-12};
	int[]y = {-3,-3,0,3,3,0};
	
	
	//Constructor, need position, rotation, scale and colour
	
	public DisplaySegment(int xOffset, int yOffset, int rotation, double scale, Color color){
		xpos = xOffset;
		ypos = yOffset;
		angle = rotation;
		scaleX = scale;
		scaleY = scale;
		colour = color;
		xpoints = x;
		ypoints = y;
		fixAngle();
				
	}
	
	public DisplaySegment(int[] xCoords, int[] yCoords, int xOffset, int yOffset, int rotation, double xScale, double yScale, Color color, boolean bg){
	  //This Should not be used
		super(xCoords,yCoords,xOffset,yOffset,rotation,xScale,yScale,color,bg);
	}
}
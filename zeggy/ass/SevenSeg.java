//SevenSeg.java
//Makes a 7segment display out of DisplaySegments
//Only handles 0-9 
//az23
//
import java.util.ArrayList;
import java.awt.Color;
import java.lang.Math;
public class SevenSeg{
	ArrayList <ZPolygon> display;
	int number;
	//Used to decode numbers to 7segments
	//First Dimension is number
	//Second is list of switches for the segments
	boolean[][] switchPattern = new boolean[][]{
		{ true,true,true,false,true,true,true}, 	//0 
		{ false,false,true,false,false,true,false },//1 
		{ true,false,true,true,true,false,true },	//2 
		{ true,false,true,true,false,true,true },	//3
		{ false,true,true,true,false,true,false},	//4
		{ true,true,false,true,false,true,true },	//5
		{ true,true,false,true,true,true,true },	//6
		{ true,false,true,false,false,true,false },	//7
		{ true,true,true,true,true,true,true },		//8
		{ true,true,true,true,false,true,false},	//9
	};
	
	//offsets of the segments
	int[] segXoffsets = new int[]{0,-15,15,0,-15,15,0};
	int[] segYoffsets = new int[]{-26,-13,-13,0,13,13,26};
	int[] segRotations = new int[]{0,90,90,0,90,90,0};
	
	//Create and postion Lit segments to make the display
	
	public SevenSeg(int xOffset,int yOffset, int disp, double sf, int angle){
		int number = disp;
		display = new ArrayList <ZPolygon>();
		
		if(number > -1 && number < 10){ //Limitations of seven segments, noone wants a score in hex
										//People who read sourcecode don't count
			
			
			for(int i=0; i < 7;i++){ 				//for each segment
				if(switchPattern[number][i]){		//if segment is lit
													//create segment, Add to Display
									
					int newxOffset = (int) Math.round(segXoffsets[i] * sf); // Scale offsets 
					int newyOffset = (int) Math.round(segYoffsets[i] * sf);	
					display.add(new DisplaySegment(newxOffset + xOffset, newyOffset + yOffset, segRotations[i]-angle,sf,new Color(0,128,0)));
					display.add(new DisplaySegment(newxOffset + xOffset, newyOffset + yOffset, segRotations[i]-angle ,0.8 * sf,new Color(0,255,0)));
					
				}
			}
		}	
	}
	
	public ArrayList <ZPolygon> getDrawList(){
		return display;		
	}
}
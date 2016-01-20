//Scoreboard
//az23
import java.util.ArrayList;
import java.lang.Math;
public class Scoreboard{
ArrayList <ZPolygon> items;
	//the offsets here should be top right of where should be drawn;
	public Scoreboard(int xOffset,int yOffset,double sf,int sc){
		//how many numbers do we need to draw
		items = new ArrayList <ZPolygon>();
		int borderxOffset = 40; //distance between digits at 1x scale
		int borderyOffset = 32;	
		int score = sc;
		borderxOffset =(int)Math.round(borderxOffset*sf);
		borderyOffset =(int)Math.round(borderyOffset*sf);
	    
		if(sc<0){sc=0;} // dont do negative
		int digits = 1;
		
		 
		while(score > 9){
			score = (int) score/10;
			digits ++;
		}
		//numbers = new int[digits];
		score = sc;
		for(int i = 0; i< digits;i++){
			int newxOffset =(xOffset - (i * borderxOffset)) - (int)Math.round(borderxOffset/2);
			//int newyOffset =();
			items.addAll(new SevenSeg(newxOffset ,yOffset + borderyOffset, score % 10,sf,0).getDrawList());
			score = score / 10;
		}
		
		//SevenSeg(int xOffset,int yOffset,int disp){

	
	}
	public ArrayList <ZPolygon> getScoreboard(){	
		return items;
	}
}
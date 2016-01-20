//Madness Engine
//Don't fuckin ask ok?
//az23

//For double buffering: create offscreen Image object, do all drawing to it, when done, draw the Image to screen
import java.awt.*;
import javax.swing.*;
import java.util.ArrayList;

public class MadnessEngine extends JPanel{
SinTable st;
ArrayList <ZPolygon> drawList;
	boolean done = true;
	public void paintComponent(Graphics g){
			if(done){
			done = false;
			super.paintComponent(g);
			this.setBackground(Color.BLACK);
			Image frameBuffer = this.createImage(640,480);
			Graphics fb = frameBuffer.getGraphics();
		//	frameBuffer.setBackground(Color.BLACK);
			
			//For Each element in drawList
			//Draw The element
			
				for(int i=0; i < drawList.size(); i++){
					//change the colour
					//calculate the new points
					//draw the poly
					//done = false;
					fb.setColor(drawList.get(i).colour);
					fb.fillPolygon(drawList.get(i).getTransformedPoly(st));
					
				}
				
			g.drawImage(frameBuffer,0,0,new Color(255,0,255),this);
			done = true;
		}
	}
		
	
	public MadnessEngine(ArrayList <ZPolygon> dl){
		drawList = new ArrayList <ZPolygon>(dl); 
		st = new SinTable();
	}
	
	public void setdrawList(ArrayList <ZPolygon> dl){
		if(done){
			done = false;
			drawList.clear();
			drawList.addAll(dl); 
			done = true;
		}
		
	}

}
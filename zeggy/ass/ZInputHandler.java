//ZInputHandler.java
//Deals With Keyboard input for the MadnessEngine
//az23
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

public class ZInputHandler implements KeyListener{
	boolean[] controls;
	
	public void keyPressed(KeyEvent e){
		//System.out.println("KEYPRESSED :"+e);
		if(e.getKeyCode() == 38){
			controls[0] = true;
		}
		if(e.getKeyCode() == 40 ){
			controls[1] = true;
		}
		if(e.getKeyCode() == 37){
			controls[2] = true;
		}
		if(e.getKeyCode() == 39){
			controls[3] = true;
		}

	}

	public void keyReleased(KeyEvent e){
		//System.out.println("KEYRELEASED :"+e);
		if(e.getKeyCode() == 38){
			controls[0] = false;
		}
		if(e.getKeyCode() == 40 ){
			controls[1] = false;
		}
		if(e.getKeyCode() == 37){
			controls[2] = false;
		}
		if(e.getKeyCode() == 39){
			controls[3] = false;
		}
	
	}

	public void keyTyped(KeyEvent e){
		//System.out.println("KEYTYPED :"+e);
	
	}
	
	public ZInputHandler(boolean[] con){
		controls = con;
	}


}
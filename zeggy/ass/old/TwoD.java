//TwoD.java
//Experimentation in 2d Graphics code
//az23
import javax.swing.*;
import java.lang.*;

public class TwoD{
	public static void main(String[] args){
		boolean[] controls = {false,false,false,false};
		SinTable st = new SinTable();
		JFrame mainWin = new JFrame("final int fucksGiven = 0");
		mainWin.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		mainWin.setSize(640,480);
		mainWin.setVisible(true);
		mainWin.addKeyListener(new ZInputHandler(controls));
		DrawThread th;
		int mode = 0;
		if (args.length >0){
			try{
				mode = Integer.parseInt(args[0]);
			}
			catch(Exception e){
				System.out.println("Invalid Command line argument: " +args[0] +"\tStarting in mode 0");
			}
		}
		
		th = new DrawThread(mainWin,mode,controls,st);
		new Thread(th).start();
		mainWin.repaint();
	}
 
}
//The bullet object
//az23
import java.awt.Color;
public class Bullet extends ZPolygon{
	int[]x = {0,7,31,7,0,-7,-31,-7};
	int[]y = {-31,-7,0,7,31,7,0,-7};
	int speed = 0;
	int heading = 0; //Direction of motion

	//Bullets are dumb just need to move forward
	public Bullet(int spd, int head, int xOffset, int yOffset){
			angle= 0;
			xpos = xOffset;
			ypos = yOffset;
			xpoints = x;
			ypoints = y;
			speed =spd;
			heading = fixAngle(head+180);
			colour = new Color(0,0,255);
			scaleX = 0.5;
			scaleY = 0.5;
	}
	
	public void doMove(SinTable st){
			xpos = xpos - (int) Math.round(speed * st.sin(heading));
			ypos = ypos - (int) Math.round(speed * st.cos(heading));
			angle = angle + 4;
			fixAngle();
	}
}
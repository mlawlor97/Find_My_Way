using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;

public class GenerateSchematics : MonoBehaviour {

	public bool readBinary;
	public float wallHeight;
	public float wallWidth;
	public TextAsset ta;
	public TextAsset bf;
	public GameObject wall;
	public GameObject positioner;
	GameObject wallCopy;
	GameObject positionerCopy;

	// Use this for initialization
	void Start () {
		string schematic = ta.text;
		int i = 0;
		if (!readBinary) {
			while (i < schematic.Length) {
				if (schematic [i] == '\n') {
					i++;
				} else if (schematic [i] == ' ') {
					i++;
				} else if (schematic [i] == 'b') {
					int j = i;
					while (schematic [j] != '\n') {
						j++;
					}
					readBox (schematic.Substring (i, j - i));
					i += j - i;
				} else if (schematic [i] == 'w') {
					int j = i;
					while (schematic [j] != '\n') {
						j++;
					}
					readWall (schematic.Substring (i, j - i));
					i += j - i;
				} else {
					Debug.Log ("error reading text file");
					i++;
				}
			}
		} else {

		}
	}
	
	void readBox(string line){
		Debug.Log (line);
		int i = 2;
		float posX, posY, width, height, rot;
		posX = parseNextInt (line, ref i);
		posY = parseNextInt (line, ref i);
		width = parseNextInt (line, ref i);
		height = parseNextInt (line, ref i);
		rot = parseNextInt (line, ref i);
//		Debug.Log ("posX: " + posX);
//		Debug.Log ("posY: " + posY);
//		Debug.Log ("width: " + width);
//		Debug.Log ("height: " + height);
//		Debug.Log ("rot: " + rot);
		positionerCopy = Instantiate (positioner, new Vector3 (posX, 0, posY), Quaternion.identity);
		wallCopy = Instantiate (wall, new Vector3 (posX, 0, posY + height / 2), Quaternion.identity, positionerCopy.transform);
		wallCopy.transform.localScale = new Vector3 (width, wallHeight, wallWidth);
		wallCopy = Instantiate (wall, new Vector3 (posX, 0, posY - height / 2), Quaternion.identity, positionerCopy.transform);
		wallCopy.transform.localScale = new Vector3 (width, wallHeight, wallWidth);
		wallCopy = Instantiate (wall, new Vector3 (posX + width / 2, 0, posY), Quaternion.identity, positionerCopy.transform);
		wallCopy.transform.localScale = new Vector3 (wallWidth, wallHeight, height);
		wallCopy = Instantiate (wall, new Vector3 (posX - width / 2, 0, posY), Quaternion.identity, positionerCopy.transform);
		wallCopy.transform.localScale = new Vector3 (wallWidth, wallHeight, height);
		positionerCopy.transform.rotation = Quaternion.Euler (new Vector3 (0, rot, 0));
	}

	void readWall(string line){
		Debug.Log (line);
		int i = 2;
		float pos1X, pos1Y, pos2X, pos2Y;
		pos1X = parseNextInt (line, ref i);
		pos1Y = parseNextInt (line, ref i);
		pos2X = parseNextInt (line, ref i);
		pos2Y = parseNextInt (line, ref i);
//		Debug.Log ("pos1X: " + pos1X);
//		Debug.Log ("pos1Y: " + pos1Y);
//		Debug.Log ("pos2X: " + pos2X);
//		Debug.Log ("pos2Y: " + pos2Y);
		wallCopy = Instantiate (wall, new Vector3 ((pos1X + pos2X) / 2, 0, (pos1Y + pos2Y) / 2), Quaternion.identity);
		wallCopy.transform.localScale = new Vector3 (wallWidth, wallHeight, Vector3.Distance(new Vector3(pos1X, 0, pos1Y), new Vector3(pos2X, 0, pos2Y)));
		wallCopy.transform.LookAt (new Vector3 (pos2X, 0, pos2Y));
	}

	float parseNextInt (string line, ref int i){
		int j = i;
		while (line [j] != ' ') {
			j++;
			if (j >= line.Length) {
				break;
			}
		}
		float result = float.Parse (line.Substring (i, j - i));
		i = j + 1;
		return result;
	}
}

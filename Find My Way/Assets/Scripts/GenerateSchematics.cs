using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;
using UnityEngine.UI;

public class GenerateSchematics : MonoBehaviour {

	public bool readBinary;
	public float wallHeight;
	public float wallWidth;
	public TextAsset ta;
	public TextAsset bf;
	public GameObject wall;
	public GameObject positioner;
	public Material wallMat;
	public Material wallMatFade;
	public Text floorDisplay;
	public GameObject roomTextCanvas;
	public GameObject roomTextText;
	GameObject roomCanvasCopy;
	GameObject roomTextCopy;
	GameObject wallCopy;
	GameObject positionerCopy;
	List<Floor> floorList = new List<Floor>();
	int currentFloor;

	// Use this for initialization
	void Start () {
		currentFloor = 0;
		floorList.Add(new Floor());
		string schematic = ta.text;
		int i = 0;
		if (!readBinary) {
			while (i < schematic.Length) {
				if (schematic [i] == '\n') {
					i++;
				} else if (schematic [i] == ' ') {
					i++;
				} else if (schematic [i] == 'f') {
					currentFloor++;
					floorList.Add(new Floor());
					i++;
				} else if (schematic [i] == 'b') {
					int j = i;
					while (schematic [j] != '\n') {
						j++;
					}
					floorList[currentFloor].rooms.Add(readBox (schematic.Substring (i, j - i)));
					i += j - i;
				} else if (schematic [i] == 'w') {
					int j = i;
					while (schematic [j] != '\n') {
						j++;
					}
					floorList[currentFloor].rooms.Add(readWall (schematic.Substring (i, j - i)));
					i += j - i;
				} else {
					Debug.Log ("error reading text file");
					i++;
				}
			}
		} else {

		}

		for (int x = 0; x < floorList.Count; x++) {
			Debug.Log (floorList [x].rooms.Count);
		}

		currentFloor = 1;

		foreach (Floor f in floorList) {
			foreach (GameObject g in f.rooms) {
				if (g.name.Contains ("Positioner")) {
					foreach (Renderer childRend in g.transform.GetComponentsInChildren<Renderer>()) {
						childRend.material = wallMat;
					}
				} else {
					g.GetComponent<Renderer> ().material = wallMat;
				}
			}
		}



		for (int k = 0; k < floorList.Count; k++) {
			foreach (GameObject g in floorList[k].rooms) {
				g.SetActive (false);
			}
		}

		foreach (GameObject g in floorList[currentFloor].rooms) {
			g.SetActive (true);
		}

		foreach (GameObject g in floorList[currentFloor - 1].rooms) {
			g.transform.position = new Vector3 (g.transform.position.x, -wallHeight * 2, g.transform.position.z);
			g.SetActive (true);
			if (g.name.Contains ("Positioner")) {
				g.transform.GetChild (g.transform.childCount - 1).gameObject.SetActive (false);
				foreach (Renderer childRend in g.transform.GetComponentsInChildren<Renderer>()) {
					childRend.material = wallMatFade;
				}
			} else {
				g.GetComponent<Renderer> ().material = wallMatFade;
			}
		}

		if (currentFloor == 0) {
			floorDisplay.text = "B";
		} else {
			floorDisplay.text = currentFloor.ToString ();
		}
	}
	
	GameObject readBox(string line){
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

		string roomTextString = line.Substring (i);
		roomCanvasCopy = Instantiate (roomTextCanvas, positionerCopy.transform);
		roomCanvasCopy.transform.position = positionerCopy.transform.position;
		roomTextCopy = Instantiate (roomTextText, roomCanvasCopy.transform);
		roomTextCopy.transform.position = positionerCopy.transform.position;
		roomTextCopy.GetComponent<Text> ().text = roomTextString;

		return positionerCopy;
	}

	GameObject readWall(string line){
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
		return wallCopy;
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

	public void upFloor(){
		if (currentFloor < floorList.Count - 1) {
			if (currentFloor >= 1) {
				foreach (GameObject g in floorList[currentFloor - 1].rooms) {
					g.SetActive (false);
				}
			}
			foreach (GameObject g in floorList[currentFloor].rooms) {
				g.transform.position = new Vector3 (g.transform.position.x, -wallHeight * 2, g.transform.position.z);
				if (g.name.Contains ("Positioner")) {
					g.transform.GetChild (g.transform.childCount - 1).gameObject.SetActive (false);
					foreach (Renderer childRend in g.transform.GetComponentsInChildren<Renderer>()) {
						childRend.material = wallMatFade;
					}
				} else {
					g.GetComponent<Renderer> ().material = wallMatFade;
				}
			}
			foreach (GameObject g in floorList[currentFloor + 1].rooms) {
				g.transform.position = new Vector3 (g.transform.position.x, 0, g.transform.position.z);
				g.SetActive (true);
				if (g.name.Contains ("Positioner")) {
					g.transform.GetChild (g.transform.childCount - 1).gameObject.SetActive (true);
					foreach (Renderer childRend in g.transform.GetComponentsInChildren<Renderer>()) {
						childRend.material = wallMat;
					}
				} else {
					g.GetComponent<Renderer> ().material = wallMat;
				}
			}
			currentFloor++;
			if (currentFloor == 0) {
				floorDisplay.text = "B";
			} else {
				floorDisplay.text = currentFloor.ToString ();
			}
		}
	}

	public void downFloor(){
		if (currentFloor > 0) {
			if (currentFloor >= 2) {
				foreach (GameObject g in floorList[currentFloor - 2].rooms) {
					g.SetActive (true);
					g.transform.position = new Vector3 (g.transform.position.x, -wallHeight * 2, g.transform.position.z);
					if (g.name.Contains ("Positioner")) {
						g.transform.GetChild (g.transform.childCount - 1).gameObject.SetActive (false);
						foreach (Renderer childRend in g.transform.GetComponentsInChildren<Renderer>()) {
							childRend.material = wallMatFade;
						}
					} else {
						g.GetComponent<Renderer> ().material = wallMatFade;
					}
				}
			}
			foreach (GameObject g in floorList[currentFloor].rooms) {
				g.SetActive (false);
			}
			foreach (GameObject g in floorList[currentFloor - 1].rooms) {
				g.transform.position = new Vector3 (g.transform.position.x, 0, g.transform.position.z);
				if (g.name.Contains ("Positioner")) {
					g.transform.GetChild (g.transform.childCount - 1).gameObject.SetActive (true);
					foreach (Renderer childRend in g.transform.GetComponentsInChildren<Renderer>()) {
						childRend.material = wallMat;
					}
				} else {
					g.GetComponent<Renderer> ().material = wallMat;
				}
			}
			currentFloor--;
			if (currentFloor == 0) {
				floorDisplay.text = "B";
			} else {
				floorDisplay.text = currentFloor.ToString ();
			}
		}
	}

	void Update () {
		foreach (GameObject g in floorList[currentFloor].rooms) {
			if (g.name.Contains ("Positioner")) {
				GameObject rtc = g.transform.GetChild (g.transform.childCount - 1).gameObject;
				rtc.transform.rotation = transform.rotation;
			}
		}
	}
}

public class Floor {
	public List<GameObject> rooms = new List<GameObject>();
}
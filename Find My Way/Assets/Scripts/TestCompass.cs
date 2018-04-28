using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TestCompass : MonoBehaviour {

	// Use this for initialization
	void Start () {
		Input.compass.enabled = true;
		Input.location.Start ();
	}
	
	// Update is called once per frame
	void Update () {
		transform.rotation = Quaternion.Euler (0, -Input.compass.trueHeading, 0);
	}
}

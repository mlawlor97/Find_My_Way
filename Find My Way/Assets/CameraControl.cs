using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraControl : MonoBehaviour {

	Vector3 reference;
	public float compassSpeed;

	// Use this for initialization
	void Start () {
		if (SystemInfo.supportsGyroscope) {
			Input.gyro.enabled = true;
		}
		//Input.compass.enabled = true;
		Input.location.Start();
		Physics.autoSimulation = false;
	}
	
	// Update is called once per frame
	void Update () {
		if (!Input.compass.enabled) {
			Input.compass.enabled = true;
		}
		transform.Rotate (-Input.gyro.rotationRateUnbiased.x, -Input.gyro.rotationRateUnbiased.y, 0);
		//transform.rotation = Quaternion.Euler (0, -Input.compass.trueHeading, 0);
//		transform.rotation = Quaternion.Euler (Vector3.SmoothDamp (
//			transform.rotation.eulerAngles,
//			new Vector3 (transform.rotation.eulerAngles.x, -Input.compass.trueHeading, transform.rotation.eulerAngles.z),
//			ref reference,
//			compassSpeed * Time.deltaTime));
		transform.rotation = Quaternion.Euler(transform.rotation.eulerAngles.x,
			Mathf.LerpAngle(transform.rotation.eulerAngles.y, Input.compass.trueHeading, compassSpeed * Time.deltaTime),
			0);
		if (Input.GetTouch (0).position.x < Screen.width / 5) {
			transform.rotation = Quaternion.Euler (0, 0, 0);
		}
	}
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraControl : MonoBehaviour {

	GameObject cameraChild;
	public float compassSpeed;
	public float zoomSensitivity;
	public float translateSensitivity;
	public float rotationSensitivity;
	bool useGyroControl;
	float zoom;

	public Vector3 dbg;

	// Use this for initialization
	void Start () {
		if (SystemInfo.supportsGyroscope) {
			Input.gyro.enabled = true;
		}
		//Input.compass.enabled = true;
		Input.location.Start();
		Physics.autoSimulation = false;

		useGyroControl = false;
		cameraChild = transform.Find ("Main Camera").gameObject;
		zoom = 1;
	}
	
	// Update is called once per frame
	void Update () {
		if (!Input.compass.enabled) {
			Input.compass.enabled = true;
		}
		if (useGyroControl) {
			//rotate with gyro
			transform.rotation = Quaternion.Euler (90, 0, 0) *
			new Quaternion (Input.gyro.attitude.x, Input.gyro.attitude.y, -Input.gyro.attitude.z, -Input.gyro.attitude.w);
			transform.rotation = Quaternion.Euler (transform.rotation.eulerAngles.x,
												   Mathf.LerpAngle (transform.rotation.eulerAngles.y, Input.compass.trueHeading, compassSpeed * Time.deltaTime),
												   0);
		} else {
			//rotate with gestures
			if (Input.touchCount == 1) {
				Touch touch = Input.GetTouch (0);
				Vector2 touchDelta = touch.deltaPosition;
				/*transform.Rotate(Vector3.up     * touchDelta.x * rotationSensitivity +
								 -Vector3.right * touchDelta.y * rotationSensitivity);*/
				transform.rotation = Quaternion.Euler (transform.rotation.eulerAngles.x - touchDelta.y * rotationSensitivity,
													   transform.rotation.eulerAngles.y + touchDelta.x * rotationSensitivity,
													   0f);
			}
		}

		//adjust zoom with orientation
		if (Input.deviceOrientation == DeviceOrientation.LandscapeLeft || Input.deviceOrientation == DeviceOrientation.LandscapeRight) {
			cameraChild.transform.localPosition = new Vector3 (cameraChild.transform.localPosition.x,
															   cameraChild.transform.localPosition.y,
															   -25 * zoom);
		} else {
			cameraChild.transform.localPosition = new Vector3 (cameraChild.transform.localPosition.x,
															   cameraChild.transform.localPosition.y,
															   -25 * zoom * 2);
		}

		//zoom with gesture
		if (Input.touchCount == 2) {
			// Store both touches.
			Touch touchZero = Input.GetTouch (0);
			Touch touchOne = Input.GetTouch (1);

			// Find the position in the previous frame of each touch.
			Vector2 touchZeroPrevPos = touchZero.position - touchZero.deltaPosition;
			Vector2 touchOnePrevPos = touchOne.position - touchOne.deltaPosition;

			// Find the magnitude of the vector (the distance) between the touches in each frame.
			float prevTouchDeltaMag = (touchZeroPrevPos - touchOnePrevPos).magnitude;
			float touchDeltaMag = (touchZero.position - touchOne.position).magnitude;

			// Find the difference in the distances between each frame.
			float deltaMagnitudeDiff = prevTouchDeltaMag - touchDeltaMag;

			// Otherwise change the field of view based on the change in distance between the touches.
			zoom += deltaMagnitudeDiff * zoomSensitivity;
		}

		//translate with gesture
		if (Input.touchCount == 2) {
			Touch touch0 = Input.GetTouch (0);
			Touch touch1 = Input.GetTouch (1);
			Vector2 touchDeltaAvg = (touch0.deltaPosition + touch1.deltaPosition) / 2;
			Vector3 weirdForward = new Vector3 (transform.forward.x, 0f, transform.forward.z).normalized;
			Vector3 weirdRight = new Vector3 (transform.right.x, 0f, transform.right.z).normalized;
			transform.position += -weirdForward * touchDeltaAvg.y * translateSensitivity +
				-weirdRight   * touchDeltaAvg.x * translateSensitivity;
		}
	}

	public void toggleGyroControl () {
		useGyroControl = !useGyroControl;
	}

	public void setZoomSensitivity (float newZoomSensitivity) {
		zoomSensitivity = newZoomSensitivity;
	}
}

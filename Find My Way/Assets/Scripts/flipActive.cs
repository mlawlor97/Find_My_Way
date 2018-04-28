using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class flipActive : MonoBehaviour {

	public void flip () {
		this.gameObject.SetActive (!this.gameObject.activeSelf);
	}
}

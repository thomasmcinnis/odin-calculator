# Teenage Engineering inspired calculator

## About
A classic build-a-calculator project - this is the capstone for the Foundations course from [The Odin Project](https://www.theodinproject.com). 


## Calculator Logic
The [project description](https://www.theodinproject.com/lessons/foundations-calculator) is pretty light on requirements for calculator performance beyond the basics. I decided to write my own spec here as I figured it would be helpfull to write out longhand what a basic calculator actually needs to do.

The calculator screen needs to display a numerical string up to a known length.

The calculator needs keys:
* Num keys (0-9 plus a point sign)
* Function keys (clear, plus/minus, and percent)
* Operator keys (+, -, *, /)
* Equals key

Logic run by the calculator is triggered on key press.
* Tapping num keys updates the number displayed on a screen
  * if the displayed number is the returned result from the last calculation, it is overwritten
* Tapping an operator sets that for the next calculation, saving the displayed value as the first, and subsequent num inputs will be stored ready for calculation
* Tapping the equals key runs a calculation
  * if there is only one number value it runs that number as both sides of the operation
  * if there is a previous returned value, the calculation runs with the returned value as the first argument, and the _old_ second value as the second argument
* Tapping the clear key deletes the current displayed value, and tapping it again delete a previous value if that exists
* Tapping the plus-minus sign or percent sign inverts the displayed number, or divides the displayed number by 100 respectively.


## Design
I have decided to extend the project to a build the interface in the style-de-jour: the Teenage Engineering *EP–133 K.O. II Sampler*

![Image of Teenage Engineering EP-133 K.O. II Sampler](/teenage-engineering-ep-133-ko-ii.jpeg 'The sampler')

I was particularly motivated by seeing the gorgeous button design by [Noah Shreve](https://dribbble.com/shots/23105082-Teenage-Engineering-Style-Buttons) seen below. 

This image will be used as my design spec as there is no public Figma or Sketch file available.

![Design of four square buttons which mimicks the Teenage Engineering aesthetic](/button-image-dribble-noah-shreve.jpeg)

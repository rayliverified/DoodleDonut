using UnityEngine;

namespace Vatio.Filters
{
    /*
     * This is abstract inner Low Pass Filter base class. All Low Pass Filter handler classes must derive from it.
     */
    internal abstract class AInnerLowPassFilter<T>
    {
        protected float a;
        protected T avg;

        /*
         * This is the AInnerLowPassFilter constructor.
         * It sets the smoothing factor and initial value, checking for incorrect data beforehand.
         */
        internal AInnerLowPassFilter(float a, T initialValue)
        {
            this.a = Mathf.Clamp(a, 0.0f, 1.0f);
            if (initialValue == null)
            {
                Debug.Log("Error: supplied initial value for Low Pass Filter is null - please provide a correct value, that is as close as possible to expected average value of the filtered variable");
                throw new System.ArgumentNullException("Low Pass Filter initial value cannot be null");
            }
            avg = initialValue;
        }

        /*
         * This is the function adding new generic unfiltered value for the filter
         * Parameters are:
         *      input - the new value
         *      
         * The function returns the new filtered value
         */
        internal T Append(T input)
        {
            avg = CalculateAvgWithInput(input);
            return avg;
        }

        /*
         * This is the getter for current filtered value
         */
        internal T Get()
        {
            return avg;
        }


        /*
         * This is the setter for the smoothing factor
         */
        internal void SetA(float a)
        {
            this.a = a;
        }

        /*
         * This function calculates filtered value.
         * It does so using formula: y[i] := y[i-1] + α * (x[i] - y[i-1])
         * As we can't use arithmetic operations for the type of input is not known at this point, we must use the reflections functions obtained earlier.
         * Parameters are:
         *      input - the new, unfiltered value
         */
        protected abstract T CalculateAvgWithInput(T input);
    }
}
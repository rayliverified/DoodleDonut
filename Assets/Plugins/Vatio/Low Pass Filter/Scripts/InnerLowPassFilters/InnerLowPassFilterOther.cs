using System.Reflection;
using UnityEngine;

namespace Vatio.Filters
{
    /*
     * This class handles the filtering when the value type is not handled by any other class
     */
    internal class InnerLowPassFilterOther<T> : AInnerLowPassFilter<T>
    {
        static MethodInfo add, subtract, multiplyTF;

        /*
         * This is the static constructor. It is invoked once for each class.
         * It gets "add", "subtract" and "multiply" methods of the data type using reflections.
         */
        static InnerLowPassFilterOther()
        {
            try
            {
                add = typeof(T).GetMethod("op_Addition", new System.Type[] { typeof(T), typeof(T) });
                subtract = typeof(T).GetMethod("op_Subtraction", new System.Type[] { typeof(T), typeof(T) });
                multiplyTF = typeof(T).GetMethod("op_Multiply", new System.Type[] { typeof(T), typeof(float) });
            }
            catch (System.Reflection.AmbiguousMatchException)
            {
                // This exception should not happen, as all the methods are provided with the exact parameters, but to satisfy Unity Asset Store submission guidelines it is handled.
                Debug.Log("Error: the class You are using in the filter has multiple implementations of handling operators - please use different class");
                throw;
            }

            if (add == null)
            {
                Debug.Log("Error: the class You are using does not handle '+' operator - either change the class implementation, or use a different class");
                throw new System.InvalidOperationException("Supplied data type does not support '+' operator");
            }

            if (subtract == null)
            {
                Debug.Log("Error: the class You are using does not handle '-' operator - either change the class implementation, or use a different class");
                throw new System.InvalidOperationException("Supplied data type does not support '-' operator");
            }

            if (multiplyTF == null)
            {
                Debug.Log("Error: the class You are using does not handle '*' operator between itself and a float value - either change the class implementation, or use a different class");
                throw new System.InvalidOperationException("Supplied data type does not support '*' operator between itself and a float");
            }

        }

        internal InnerLowPassFilterOther(float a, T initialValue)
            : base(a, initialValue)
        {
        }

        /*
         * This function calculates filtered value.
         * It does so using formula: y[i] = y[i-1] + α * (x[i] - y[i-1])
         * As we can't use arithmetic operations for the type of input is not known at this point, we must use the reflections functions obtained earlier.
         * Parameters are:
         *      input - the new, unfiltered value
         */
        override protected T CalculateAvgWithInput(T input)
        {

            T var1 = (T)subtract.Invoke(null, new object[] { input, avg });
            T var2 = (T)multiplyTF.Invoke(null, new object[] { var1, a });
            avg = (T)add.Invoke(null, new object[] { var2, avg });

            return avg;
        }
    }
}
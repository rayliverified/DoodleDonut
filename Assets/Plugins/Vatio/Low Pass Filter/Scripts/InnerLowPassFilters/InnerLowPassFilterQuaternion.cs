using UnityEngine;

namespace Vatio.Filters
{
    /*
     * This class handles the filtering when the value type is Quaternion
     */
    internal class InnerLowPassFilterQuaternion : AInnerLowPassFilter<Quaternion>
    {
        internal InnerLowPassFilterQuaternion(float a, Quaternion initialValue)
            : base(a, initialValue)
        {
        }

        /*
         * This function calculates filtered value, when filtered type is Quaternion.
         * This is a special case, as built-in types do not support arithmetic operations through
reflections, so here we use specific data type.
         * Parameters are:
         *      input - the new, unfiltered value
         */
        override protected Quaternion CalculateAvgWithInput(Quaternion input)
        {
            return Quaternion.Lerp(avg, input, a);
        }
    }
}

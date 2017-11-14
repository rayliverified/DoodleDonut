namespace Vatio.Filters
{
    /*
     * This class handles the filtering when the value type is double
     */
    internal class InnerLowPassFilterDouble : AInnerLowPassFilter<double>
    {
        internal InnerLowPassFilterDouble(float a, double initialValue)
            : base(a, initialValue)
        {
        }

        /*
         * This function calculates filtered value, when filtered type is double.
         * This is a special case, as built-in types do not support arithmetic operations through
reflections, so here we use specific data type.
         * Parameters are:
         *      input - the new, unfiltered value
         */
        override protected double CalculateAvgWithInput(double input)
        {
            return (double)(avg + a * (input - avg));
        }
    }
}

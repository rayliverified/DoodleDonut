namespace Vatio.Filters
{
    /*
     * This class handles the filtering when the value type is int
     */
    internal class InnerLowPassFilterInt : AInnerLowPassFilter<int>
    {
        internal InnerLowPassFilterInt(float a, int initialValue)
            : base(a, initialValue)
        {
        }

        /*
         * This function calculates filtered value, when filtered type is int.
         * This is a special case, as built-in types do not support arithmetic operations through reflections, so here we use specific data type.
         * Parameters are:
         *      input - the new, unfiltered value
         */
        override protected int CalculateAvgWithInput(int input)
        {
            return (int)(avg + a * (input - avg));
        }
    }
}
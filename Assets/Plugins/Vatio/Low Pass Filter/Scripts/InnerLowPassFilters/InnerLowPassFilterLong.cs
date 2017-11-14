namespace Vatio.Filters
{
    /*
     * This class handles the filtering when the value type is long
     */
    internal class InnerLowPassFilterLong : AInnerLowPassFilter<long>
    {
        internal InnerLowPassFilterLong(float a, long initialValue)
            : base(a, initialValue)
        {
        }

        /*
         * This function calculates filtered value, when filtered type is long.
         * This is a special case, as built-in types do not support arithmetic operations through
reflections, so here we use specific data type.
         * Parameters are:
         *      input - the new, unfiltered value
         */
        override protected long CalculateAvgWithInput(long input)
        {
            return (long)(avg + a * (input - avg));
        }
    }
}

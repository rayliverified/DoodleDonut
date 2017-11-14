namespace Vatio.Filters
{
    /*
     * This class handles the filtering when the value type is ulong
     */
    internal class InnerLowPassFilterUlong : AInnerLowPassFilter<ulong>
    {
        internal InnerLowPassFilterUlong(float a, ulong initialValue)
            : base(a, initialValue)
        {
        }

        /*
         * This function calculates filtered value, when filtered type is ulong.
         * This is a special case, as built-in types do not support arithmetic operations through
reflections, so here we use specific data type.
         * Parameters are:
         *      input - the new, unfiltered value
         */
        override protected ulong CalculateAvgWithInput(ulong input)
        {
            return (ulong)(avg + a * (input - avg));
        }
    }
}

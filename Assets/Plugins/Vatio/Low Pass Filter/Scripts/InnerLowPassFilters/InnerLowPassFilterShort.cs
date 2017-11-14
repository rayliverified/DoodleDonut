namespace Vatio.Filters
{
    /*
     * This class handles the filtering when the value type is short
     */
    internal class InnerLowPassFilterShort : AInnerLowPassFilter<short>
    {
        internal InnerLowPassFilterShort(float a, short initialValue)
            : base(a, initialValue)
        {
        }

        /*
         * This function calculates filtered value, when filtered type is short.
         * This is a special case, as built-in types do not support arithmetic operations through
reflections, so here we use specific data type.
         * Parameters are:
         *      input - the new, unfiltered value
         */
        override protected short CalculateAvgWithInput(short input)
        {
            return (short)(avg + a * (input - avg));
        }
    }
}

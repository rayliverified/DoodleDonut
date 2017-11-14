namespace Vatio.Filters
{
    /*
     * This class handles the filtering when the value type is ushort
     */
    internal class InnerLowPassFilterUshort : AInnerLowPassFilter<ushort>
    {
        internal InnerLowPassFilterUshort(float a, ushort initialValue)
            : base(a, initialValue)
        {
        }

        /*
         * This function calculates filtered value, when filtered type is ushort.
         * This is a special case, as built-in types do not support arithmetic operations through
reflections, so here we use specific data type.
         * Parameters are:
         *      input - the new, unfiltered value
         */
        override protected ushort CalculateAvgWithInput(ushort input)
        {
            return (ushort)(avg + a * (input - avg));
        }
    }
}

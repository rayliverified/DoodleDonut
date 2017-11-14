namespace Vatio.Filters
{
    /*
     * This class handles the filtering when the value type is uint
     */
    internal class InnerLowPassFilterUint : AInnerLowPassFilter<uint>
    {
        internal InnerLowPassFilterUint(float a, uint initialValue)
            : base(a, initialValue)
        {
        }

        /*
         * This function calculates filtered value, when filtered type is uint.
         * This is a special case, as built-in types do not support arithmetic operations through
reflections, so here we use specific data type.
         * Parameters are:
         *      input - the new, unfiltered value
         */
        override protected uint CalculateAvgWithInput(uint input)
        {
            return (uint)(avg + a * (input - avg));
        }
    }
}

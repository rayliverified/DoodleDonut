namespace Vatio.Filters
{
    /*
     * This class handles the filtering when the value type is decimal
     */
    internal class InnerLowPassFilterDecimal : AInnerLowPassFilter<decimal>
    {
        internal InnerLowPassFilterDecimal(float a, decimal initialValue)
            : base(a, initialValue)
        {
        }

        /*
         * This function calculates filtered value, when filtered type is decimal.
         * This is a special case, as built-in types do not support arithmetic operations through
reflections, so here we use specific data type.
         * Parameters are:
         *      input - the new, unfiltered value
         */
        override protected decimal CalculateAvgWithInput(decimal input)
        {
            return (decimal)(avg + (decimal)a * (input - avg));
        }
    }
}

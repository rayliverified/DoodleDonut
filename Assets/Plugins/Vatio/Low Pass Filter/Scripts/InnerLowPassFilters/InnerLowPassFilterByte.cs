namespace Vatio.Filters
{
    /*
     * This class handles the filtering when the value type is byte
     */
    internal class InnerLowPassFilterByte : AInnerLowPassFilter<byte>
    {
        internal InnerLowPassFilterByte(float a, byte initialValue)
            : base(a, initialValue)
        {
        }

        /*
         * This function calculates filtered value, when filtered type is byte.
         * This is a special case, as built-in types do not support arithmetic operations through reflections, so here we use specific data type.
         * Parameters are:
         *      input - the new, unfiltered value
         */
        override protected byte CalculateAvgWithInput(byte input)
        {
            return (byte)(avg + a * (input - avg));
        }
    }
}

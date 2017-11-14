
/*
 * This is the main filter class. The filter works by averaging current data with past values
 */

using System;
using System.Collections.Generic;
using UnityEngine;
namespace Vatio.Filters
{
    public class LowPassFilter<T>
    {
        AInnerLowPassFilter<T> innerLowPassFilter;

        // Types that require special handling
        enum SpecialTypes { stbyte, stsbyte, stshort, stushort, stint, stuint, stlong, stulong, stfloat, stdouble, stdecimal, stQuaternion };

        Dictionary<Type, SpecialTypes> specialTypesMapping = new Dictionary<Type, SpecialTypes>() { 
            {typeof(byte), SpecialTypes.stbyte},
            {typeof(sbyte), SpecialTypes.stsbyte},
            {typeof(short), SpecialTypes.stshort},
            {typeof(ushort), SpecialTypes.stushort},
            {typeof(int), SpecialTypes.stint},
            {typeof(uint), SpecialTypes.stuint},
            {typeof(long), SpecialTypes.stlong},
            {typeof(ulong), SpecialTypes.stulong},
            {typeof(float), SpecialTypes.stfloat},
            {typeof(double), SpecialTypes.stdouble},
            {typeof(decimal), SpecialTypes.stdecimal},
            {typeof(Quaternion), SpecialTypes.stQuaternion}
        };

        /*
        * This is the constructor for the filter. It checks what class should handle the supplied data type. If it is one of the generics it will be handled by the appropriate class, if not it will be handled by the default class.
        * Parameters are:
        *      a - alpha parameter, the lower the value, the more inertia filter has, it has to be in range [0, 1]
        *      initialValue - initial value for the filter, it should be set as close as possible to expected average value of the filtered variable
        */
        public LowPassFilter(float a, T initialValue)
        {
            if (specialTypesMapping.ContainsKey(typeof(T)))
            {
                switch (specialTypesMapping[typeof(T)])
                {
                    case SpecialTypes.stbyte:
                        innerLowPassFilter = (AInnerLowPassFilter<T>)(object)(new InnerLowPassFilterByte(a, (Byte)(object)initialValue));
                        break;
                    case SpecialTypes.stsbyte:
                        innerLowPassFilter = (AInnerLowPassFilter<T>)(object)(new InnerLowPassFilterSbyte(a, (sbyte)(object)initialValue));
                        break;
                    case SpecialTypes.stshort:
                        innerLowPassFilter = (AInnerLowPassFilter<T>)(object)(new InnerLowPassFilterShort(a, (short)(object)initialValue));
                        break;
                    case SpecialTypes.stushort:
                        innerLowPassFilter = (AInnerLowPassFilter<T>)(object)(new InnerLowPassFilterUshort(a, (ushort)(object)initialValue));
                        break;
                    case SpecialTypes.stint:
                        innerLowPassFilter = (AInnerLowPassFilter<T>)(object)(new InnerLowPassFilterInt(a, (int)(object)initialValue));
                        break;
                    case SpecialTypes.stuint:
                        innerLowPassFilter = (AInnerLowPassFilter<T>)(object)(new InnerLowPassFilterUint(a, (uint)(object)initialValue));
                        break;
                    case SpecialTypes.stlong:
                        innerLowPassFilter = (AInnerLowPassFilter<T>)(object)(new InnerLowPassFilterLong(a, (long)(object)initialValue));
                        break;
                    case SpecialTypes.stulong:
                        innerLowPassFilter = (AInnerLowPassFilter<T>)(object)(new InnerLowPassFilterUlong(a, (ulong)(object)initialValue));
                        break;
                    case SpecialTypes.stfloat:
                        innerLowPassFilter = (AInnerLowPassFilter<T>)(object)(new InnerLowPassFilterFloat(a, (float)(object)initialValue));
                        break;
                    case SpecialTypes.stdouble:
                        innerLowPassFilter = (AInnerLowPassFilter<T>)(object)(new InnerLowPassFilterDouble(a, (double)(object)initialValue));
                        break;
                    case SpecialTypes.stdecimal:
                        innerLowPassFilter = (AInnerLowPassFilter<T>)(object)(new InnerLowPassFilterDecimal(a, (decimal)(object)initialValue));
                        break;
                    case SpecialTypes.stQuaternion:
                        innerLowPassFilter = (AInnerLowPassFilter<T>)(object)(new InnerLowPassFilterQuaternion(a, (Quaternion)(object)initialValue));
                        break;
                    default:
                        innerLowPassFilter = new InnerLowPassFilterOther<T>(a, initialValue);
                        break;
                }
            }
            else
            {
                innerLowPassFilter = new InnerLowPassFilterOther<T>(a, initialValue);
            }
        }

        /*
         * This is the function adding new generic unfiltered value for the filter
         * Parameters are:
         *      input - the new value
         *      
         * The function returns the new filtered value
         */
        public T Append(T input)
        {
            return innerLowPassFilter.Append(input);
        }

        /*
         * This is the getter for current filtered value
         */
        public T Get()
        {
            return innerLowPassFilter.Get();
        }


        /*
         * This is the setter for the smoothing factor
         */
        public void SetA(float a)
        {
            innerLowPassFilter.SetA(a);
        }
    }
}
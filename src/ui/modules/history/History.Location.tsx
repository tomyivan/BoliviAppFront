
import { useEffect, useState } from 'react';
import { Departaments,  HistoryForm } from '../../../domain';
import { Input, InputSelect2 } from '../../shared';
import { useFormContext } from 'react-hook-form';
import { Maps } from '../../components';
interface HistoryLocationProps {
    departaments: Departaments[];
    // handleCordinates?: (cordinates: { lat: number; lng: number }) => void;
    lat?: number;
    lng?: number;
}

export const HistoryLocation:React.FC<HistoryLocationProps> = ({
    departaments,
    lat,
    lng,
}) => {
    const { control, setValue, register, formState:{errors}, watch } = useFormContext<HistoryForm>();
    const [showMap, setShowMap] = useState(false);
    const handleCordinates = (cordinates: { lat: number; lng: number }) => {
        setValue('location.latitude', showMap ?  cordinates.lat : undefined);
        setValue('location.longitude', showMap ? cordinates.lng : undefined);
    };
    const handleShowMap = () => { 
      if(showMap) {
        setValue('location.latitude', undefined);
        setValue('location.longitude', undefined);
      }else {
        setValue('location.latitude', lat);
        setValue('location.longitude', lng);
      }
      setShowMap((prev) => !prev);
    }
    const department = watch('location.department');	
    useEffect(() => {
        
        setShowMap(Boolean(lat && lng))
    }, []);
    return (
        <section className="flex w-full h-full flex-col my-2">
      
             <div className="w-full">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex gap-2">
          <InputSelect2
            name="location.department"
            control={control}
            data={departaments}
            options={{ required: true }}
            variant='inp-filled'
            errors={{
              isValid: Boolean(errors.location?.department),
            }}
            placeholder="Seleccione un departamento"
            />
        </div>
        <Input
          variant='inp-filled'
          type="text"
          name={'location.name' as any}
          register={register}
          errors={{
            isValid: Boolean(errors.location?.location),
          }}
          options={{ required: true }}
          placeholder='Ingrese el nombre del lugar'
          label='Nombre del lugar'
        />
      </div>
      <div className="form-row ">
        <div className="flex items-center gap-2 cursor text-gray-700 font-semibold">
          <input
            type="checkbox"
            name="isMap"
            id="isMap"
            className="w-5 h-5 cursor-pointer"
            onChange={handleShowMap}
            checked={showMap }
          />
          <label htmlFor="isMap" className="select-none cursor-pointer">
            Agregar un Mapa
          </label>
        </div>
      </div>
      {showMap &&   
      <Maps
        cordinates={ department?.name ?  {
          lat: lat ? lat :  Number(department?.lat),
          lng: lng ? lng : Number(department?.lng),
        }: null}
        handleChange={handleCordinates}
      />
      }
    </div>
        </section>
    )

}
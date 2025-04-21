
import { useState } from 'react';
import { Departaments, EventsForm } from '../../../domain';
import { Input, InputSelect2 } from '../../shared';
import { set, useFormContext } from 'react-hook-form';
import { Maps } from '../../components';
interface EventsLocationProps {
    departaments: Departaments[];
    // handleCordinates?: (cordinates: { lat: number; lng: number }) => void;
}

export const EventsLocation:React.FC<EventsLocationProps> = ({
    departaments,
    // handleCordinates
}) => {
    const { control, setValue, register, formState:{errors}, watch } = useFormContext<EventsForm>();
    const [showMap, setShowMap] = useState(false);
    const handleCordinates = (cordinates: { lat: number; lng: number }) => {
        setValue('location.latitude', showMap ?  cordinates.lat : 0);
        setValue('location.longitude', showMap ? cordinates.lng : 0);
    };
    const department = watch('location.departament');	
    return (
        <section className="flex w-full h-full flex-col my-2">
             <div className="flex items-center my-2">
             <p className="font-bold text-gray-700 text-xl ">4. Locaciones </p>
             </div>
             <div className="w-full">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex gap-2">
          <InputSelect2
            name="location.departament"
            control={control}
            data={departaments}
            options={{ required: true }}
            variant='inp-filled'
            errors={{
              isValid: Boolean(errors.location?.departament),
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
            isValid: Boolean(errors.location?.name),
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
            onChange={() => setShowMap((prev) => !prev)}
            checked={showMap}
          />
          <label htmlFor="isMap" className="select-none cursor-pointer">
            Agregar un Mapa
          </label>
        </div>
      </div>
      {showMap && 
      <Maps
        cordinates={ department?.name ?  {
          lat: Number(department?.lat),
          lng: Number(department?.lng),
        }: null}
        handleChange={handleCordinates}
      />
      }
    </div>
        </section>
    )

}

import { useState, useEffect } from 'react';
import { createContainer } from 'react-tracked';

import { helperReadSealTypes } from '../database/DatabaseHelper';

/** Провайдер данных с оборудования */
function SealTypesContext() {
  const [sealtypes, setSealTypes] = useState([]);

  useEffect(() => { helperReadSealTypes("").then(types => setSealTypes(types)) }, [])

  console.log("+++ SEALTYPE PROVIDER RENDER +++");
  return [sealtypes]
}

export const {
  Provider: SealTypeProvider,
  useTrackedState: useSealType,
  useUpdate: updateSealType,
} = createContainer(SealTypesContext);
interface OpcionesIniciar {
  data_path: string;
  en_test: boolean;
  ancho: number;
  alto: number;
  escalar: boolean;
  omitir_impresion_de_version: boolean;
}

interface CallBackEvento {
  (): void;
}

interface CustomEvent extends Event {
    initCustomEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, detailArg: any): void;
}

declare var CustomEvent: {
    prototype: CustomEvent;
    new(typeArg: string, eventInitDict?: CustomEventInit): CustomEvent;
};

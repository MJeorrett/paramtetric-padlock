import React, { useState } from 'react';
import { NumberControl } from './NumberControl';
import { ColorControl } from './ColorControl';

type Setting<T extends string | number> = {
  default: T,
  label: string,
  type?: 'color' | 'number',
  min?: number | ((settings: any) => number),
  max?: number | ((settings: any) => number),
  constraint?: (value: T, settings: any, setters: any) => void
}

type Settings = {
  [key: string]: Setting<string|number>
}

type SettingsState = {
  [key: string]: number | string,
}

type SettingsSetters<T> = {
  [key: string]: (value: T) => void,
}

export function withSettings<T extends number | string>({ settings: settingsConfigs }: { settings: Settings }) {

  return (Component: React.ComponentType<any>) => (props: any) => {
    const controls: React.ReactElement[] = [];
    const settingsState: SettingsState = {};
    const settingsSetters: SettingsSetters<T> = {};

    Object.keys(settingsConfigs).forEach(settingKey => {
      const settingConfig = settingsConfigs[settingKey];
      const [value, setValue] = useState(settingConfig.default);

      const setter = settingConfig.constraint ?
        (value: T) => {
          setValue(value);
          (settingConfig.constraint as any)(value, settingsState, settingsSetters);
        } :
        setValue;

      if (settingConfig.type === 'color') {
        controls.push(<ColorControl
          key={settingKey}
          value={value as string}
          setValue={setter as (value: string) => void}
          label={settingConfig.label}
        />);
      } else {
        controls.push(<NumberControl
          key={settingKey}
          value={value as number}
          setValue={setter as (value: number) => void}
          label={settingConfig.label}
          min={settingConfig.min ?
            (typeof (settingConfig.min) === 'function' ?
              settingConfig.min(settingsState) :
              settingConfig.min) :
            undefined}
          max={typeof (settingConfig.max) === 'function' ?
            settingConfig.max(settingsState) :
            settingConfig.max}
        />);
      }

      settingsState[settingKey] = value;
      settingsSetters[settingKey] = setter;
    });

    return (
      <div>
        <Component {...settingsState} {...props} />
        <div>

        </div>
        <h2>Settings</h2>
        {controls}
      </div>
    );
  };
};

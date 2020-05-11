import React, {useEffect, useState} from 'react';
import {Device, DeviceInfo} from "@capacitor/core";

interface DeviceInfoResult {
  deviceInfo: DeviceInfo | null;
  error: string;
}

function useDeviceInfo(): DeviceInfoResult {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    Device.getInfo()
      .then((info) => {
        setDeviceInfo(info);
      }).catch(() => {
      setError('Could not load info!');
    })
  }, []);

  return {
    deviceInfo,
    error
  };
}

export const DeviceView = () => {
  const {deviceInfo, error} = useDeviceInfo();
  return (<>
    <h1>Device</h1>
    {error !== '' && (
      <p>{error}</p>
    )}
    <table>
      <tbody>
      {deviceInfo && (
        Object.entries(deviceInfo).map(([key, value]) => {
          return <tr key={key}>
            <td>{key}</td>
            <td>{JSON.stringify(value)}</td>
          </tr>
        })
      )}

      </tbody>
    </table>
  </>)
};
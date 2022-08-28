import wol from 'wake_on_lan';

export function wakeDevice(mac: string) {
    wol.wake(mac, err => {
        console.log(err);
    });
}
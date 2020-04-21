export class NetworkMonitor {
  mac_src: string;
  mac_dst: string;
  ip_src: string;
  ip_dst: string;
  port_src: number;
  tcp_flags: number;
  ip_proto: number;
  packets: number;
  bytes: number;
  flows: number;
  stamp_inserted: Date;
  stamp_updated: Date;
}

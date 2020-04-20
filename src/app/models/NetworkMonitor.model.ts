export class NetworkMonitor {
    mac_src : String
    mac_dst : String
    ip_src : String
    ip_dst : String
    port_src : Number
    tcp_flags : Number
    ip_proto : Number
    packets : Number
    bytes : Number
    flows : Number
    stamp_inserted : Date
    stamp_updated : Date
}

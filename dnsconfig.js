// Providers
var	REG_NONE = NewRegistrar('none', 'NONE');	// NO/UNSUPPORTED Registrars
var DNS_BIND = NewDnsProvider('bind', 'BIND', {	//INTERNAL BIND9 DNS
	'default_soa':	{
		'master':	'ns-apvs-1.thefathacker.tech.',
		'mbox':		'thefathacker.thefathacker.tech.',
		'refresh':	600,
		'retry':	60,
		'expire':	3600,
		'minttl':	30	}});
// COMMON
var NSSERVERS = [
				NAMESERVER('ns-apvs-1.thefathacker.tech.'),
				NAMESERVER('ns-apvs-2.thefathacker.tech.')
		];
var SPF = SPF_BUILDER({
				label: "@",
				overflow: "_spf%d",
				raw: "_rawspf",
				parts: [
						"v=spf1",
						"ip4:150.101.178.95",
						"ip4:150.101.181.224/29",
						"ip6:2001:44b8:2148:2900::/56",
						"include:spf.protection.outlook.com",
						"include:_spf.google.com",
						"~all"],
				flatten: []
		});
var O365 = [
				CNAME("autodiscover", "autodiscover.outlook.com."),
				CNAME("sip", "sipdir.online.lync.com."),
				CNAME("lyncdiscover", "webdir.online.lync.com."),
				CNAME("enterpriseregistration","enterpriseregistration.windows.net."),
				CNAME("enterpriseenrollment","enterpriseenrollment.manage.windows.net."),
				SRV("_sip._tls", 10, 1, 443, "sipdir.online.lync.com."),
				SRV("_sipfederationtls._tcp", 10, 1, 5061, "sipfed.online.lync.com."),
				MX("@", 0, "thefathacker-tech.mail.protection.outlook.com.")
		];
// STUB LOOKUPS
var STUB_PRD_AD = [
			NS('prd', 'dc-apvs-1.prd.thefathacker.tech.'),
			NS('prd', 'dc-apvs-2.prd.thefathacker.tech.'),
			A('dc-apvs-1.prd', '10.41.32.3'),
			AAAA('dc-apvs-1.prd', '2001:44b8:2148:2920::3'),
			A('dc-apvs-2.prd', '10.41.33.3'),
			AAAA('dc-apvs-2.prd', '2001:44b8:2148:2921::3')
		];
var NSROOTHOSTS = [
			A('ns-apvs-1', '10.41.32.2'),
			AAAA('ns-apvs-1', '2001:44b8:2148:2920::2'),
			A('ns-apvs-2', '10.41.33.2'),
			AAAA('ns-apvs-2', '2001:44b8:2148:2921::2'),
			A('resolv-apvs-1', '10.41.32.1'),
			AAAA('resolv-apvs-1', '2001:44b8:2148:2920::1'),
			A('resolv-apvs-2', '10.41.33.1'),
			AAAA('resolv-apvs-2', '2001:44b8:2148:2921::1')
		];

// FORWARD DOMAINS
D('thefathacker.tech', REG_NONE, DnsProvider(DNS_BIND), NSSERVERS, SPF, O365, STUB_PRD_AD, NSROOTHOSTS,
			A('wrt-appr-1', '10.41.16.1'),
			A('esx-apps-1.vcs','10.41.17.1'),
			AAAA('esx-apps-1.vcs','2001:44b8:2148:2911::1'),
			A('esx-apps-2.vcs','10.41.17.2'),
			AAAA('esx-apps-2.vcs','2001:44b8:2148:2911::2'),
			A('vcs-apvs-1.vcs','10.41.32.4'),
			AAAA('vcs-apvs-1.vcs','2001:44b8:2148:2920::4'),
			A('dude-apvs-1','10.41.48.1'),
			AAAA('dude-apvs-1','2001:44b8:2148:2930::1')
		);
// REVERSE DOMAINS
//Alpha - Production - Network - Hardware
D(REV('10.41.16.0/24'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('10.41.16.1', 'wrt-appr-1.thefathacker.tech.'),
			PTR('10.41.16.254', 'crs125-appr-1.thefathacker.tech.')
		);
D(REV('2001:44b8:2148:2910::/64'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('2001:44b8:2148:2910::fe', 'crs125-appr-1.thefathacker.tech.')
		);
//Alpha - Production - Hypervisor - Hardware
D(REV('10.41.17.0/24'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('10.41.17.1', 'esx-apps-1.vcs.thefathacker.tech.'),
			PTR('10.41.17.2', 'esx-apps-2.vcs.thefathacker.tech.'),
			PTR('10.41.17.254', 'crs125-appr-1.thefathacker.tech.')
		);
D(REV('2001:44b8:2148:2911::/64'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('2001:44b8:2148:2911::1', 'esx-apps-1.vcs.thefathacker.tech.'),
			PTR('2001:44b8:2148:2911::2', 'esx-apps-2.vcs.thefathacker.tech.'),
			PTR('2001:44b8:2148:2911::fe', 'crs125-appr-1.thefathacker.tech.')
		);
//Alpha - Production - NetOps - Primary
D(REV('10.41.32.0/24'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('10.41.32.1', 'resolv-apvs-1.thefathacker.tech.'),
			PTR('10.41.32.2', 'ns-apvs-1.thefathacker.tech.'),
			PTR('10.41.32.3', 'dc-apvs-1.prd.thefathacker.tech.'),
			PTR('10.41.32.4', 'vcs-apvs-1.vcs.thefathacker.tech.'),
			PTR('10.41.32.254', 'crs125-appr-1.thefathacker.tech.')
		);
D(REV('2001:44b8:2148:2920::/64'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('2001:44b8:2148:2920::1', 'resolv-apvs-1.thefathacker.tech.'),
			PTR('2001:44b8:2148:2920::2', 'ns-apvs-1.thefathacker.tech.'),
			PTR('2001:44b8:2148:2920::3', 'dc-apvs-1.prd.thefathacker.tech.'),
			PTR('2001:44b8:2148:2920::4', 'vcs-apvs-1.vcs.thefathacker.tech.'),
			PTR('2001:44b8:2148:2920::fe', 'crs125-appr-1.thefathacker.tech.')
		);
//Alpha - Production - NetOps - Secondary
D(REV('10.41.33.0/24'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('10.41.33.1', 'resolv-apvs-2.thefathacker.tech.'),
			PTR('10.41.33.2', 'ns-apvs-2.thefathacker.tech.'),
			PTR('10.41.33.3', 'dc-apvs-2.prd.thefathacker.tech.'),
			PTR('10.41.33.254', 'crs125-appr-1.thefathacker.tech.')
		);
D(REV('2001:44b8:2148:2921::/64'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('2001:44b8:2148:2921::1', 'resolv-apvs-2.thefathacker.tech.'),
			PTR('2001:44b8:2148:2921::2', 'ns-apvs-2.thefathacker.tech.'),
			PTR('2001:44b8:2148:2921::3', 'dc-apvs-2.prd.thefathacker.tech.'),
			PTR('2001:44b8:2148:2921::fe', 'crs125-appr-1.thefathacker.tech.')
		);
//Alpha - Production - Applications
D(REV('10.41.48.0/24'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('10.41.48.1', 'dude-apvs-1.thefathacker.tech.'),
			PTR('10.41.48.254', 'crs125-appr-1.thefathacker.tech.')
		);
D(REV('2001:44b8:2148:2930::/64'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('2001:44b8:2148:2930::1', 'dude-apvs-1.thefathacker.tech.'),
			PTR('2001:44b8:2148:2930::fe', 'crs125-appr-1.thefathacker.tech.')
		);

//Alpha - Production - Routes
D(REV('10.41.255.0/24'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('10.41.255.253', 'crs125-appr-1.thefathacker.tech.'),
			PTR('10.41.255.254', 'pfs-apvr-1.thefathacker.tech.')
		);
D(REV('2001:44b8:2148:29ff::/64'), REG_NONE, DnsProvider(DNS_BIND), NSSERVERS,
			PTR('2001:44b8:2148:29ff::fd', 'crs125-appr-1.thefathacker.tech.'),
			PTR('2001:44b8:2148:29ff::fe', 'pfs-apvr-1.thefathacker.tech.')
		);
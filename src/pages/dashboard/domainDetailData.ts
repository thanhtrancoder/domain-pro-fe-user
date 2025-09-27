export type recordItemProps = {
  id: number;
  type: string;
  name: string;
  value: string;
  ttl: number;
};

export const RecordItemTemp: recordItemProps[] = [
  {
    id: 1,
    type: "A",
    name: "domainpro.thanhtrancoder.example.com",
    value: "127.0.0.1",
    ttl: 3600,
  },
  {
    id: 2,
    type: "AAAA",
    name: "example.com",
    value: "::1",
    ttl: 3600,
  },
  {
    id: 3,
    type: "CNAME",
    name: "example.com",
    value: "example.com",
    ttl: 3600,
  },
];

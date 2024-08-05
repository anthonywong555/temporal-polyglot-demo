import { DefaultPayloadConverterWithProtobufs } from '@temporalio/common/lib/protobufs';
import root from '../../protos/root.js';

export const payloadConverter = new DefaultPayloadConverterWithProtobufs({ protobufRoot: root });
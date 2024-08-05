import { DefaultPayloadConverterWithProtobufs } from '@temporalio/common/lib/protobufs';
import root from '../protos/root';

export const payloadConverter = new DefaultPayloadConverterWithProtobufs({ protobufRoot: root });
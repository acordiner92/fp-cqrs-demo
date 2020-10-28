import { Merchant } from './Merchant';
import { MerchantDto } from './MerchantDto';

export const mapMerchantToDto = ({
  isDeleted: _,
  ...values
}: Merchant): MerchantDto => ({
  ...values,
});

import { useState } from 'react';
import CloseSvg from '@/styles/icon/close-circle-fill.svg';
import ViewSvg from '@/styles/icon/view.svg';
import ViewHideSvg from '@/styles/icon/view-hide.svg';
import SearchSvg from '@/styles/icon/search.svg';
import {
  useFormContext,
  RegisterOptions,
  Path,
  FieldValues,
  PathValue,
} from 'react-hook-form';

type TProps<TFormValues extends FieldValues> = {
  type?: 'text' | 'password';
  placeholder?: string;
  size?: 'lg' | 'md' | 'xs';
  disabled?: boolean;
  name: Path<TFormValues>;
  required?: boolean;
  rules?: RegisterOptions<TFormValues, Path<TFormValues>>;
  containerClassName?: string;
  inputClassName?: string;
  closeBtnHidden?: boolean;
  maxLength?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  timer?: number; // 밀리초 단위의 타이머 초기값
  leftIcon?: 'search';
  resetValue?: PathValue<TFormValues, Path<TFormValues>>;
};

// 타이머 포맷 함수
function formatMillisecondsToTime(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000); // 밀리초를 초로 변환
  const minutes = Math.floor(totalSeconds / 60); // 분 계산
  const seconds = totalSeconds % 60; // 초 계산

  // 두 자리 숫자로 포맷
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

export const HrInput = <TFormValues extends FieldValues>({
  type = 'text',
  size = 'md',
  placeholder = '',
  disabled,
  name,
  required = false,
  rules = {},
  containerClassName = '',
  inputClassName = '',
  closeBtnHidden = false,
  maxLength,
  onKeyDown,
  timer,
  leftIcon,
  // resetValue,
}: TProps<TFormValues>) => {
  // const { register, setValue, getValues, resetField } = useFormContext<TFormValues>();
  const { register, getValues, resetField } = useFormContext<TFormValues>();
  const [isFocused, setIsFocused] = useState(false);
  const [isShowPwd, setIsShowPwd] = useState(false);
  const inputType = type === 'password' && isShowPwd ? 'text' : type;

  return (
    <div
      className={`flex items-center border bg-white ${
        isFocused ? 'border-hr-purple-hover' : 'border-hr-purple-border'
      } ${sizeClasses[size]} ${
        disabled && 'bg-hr-gray-5'
      } ${containerClassName}`}
    >
      <div className="flex items-center gap-2 flex-1">
        {leftIcon === 'search' && (
          <SearchSvg
            width={iconSize[size]}
            height={iconSize[size]}
            className="text-hr-gray-60"
          />
        )}
        <input
          type={inputType}
          maxLength={maxLength}
          placeholder={placeholder}
          className={`w-full h-full outline-none ${
            isFocused ? 'text-hr-gray-90' : 'text-hr-gray-40'
          } ${inputClassName}`}
          onFocus={() => setIsFocused(true)}
          disabled={disabled}
          {...register(name, {
            required: required && '필수 항목입니다.',
            ...rules,
            onBlur: () => setIsFocused(false),
          })}
          onKeyDown={onKeyDown && onKeyDown}
        />
      </div>

      {/* timer가 있을땐 timer 노출 */}
      {timer && (
        <span className="leading-[46px] mr-1 text-hr-gray-50">
          {formatMillisecondsToTime(timer)}
        </span>
      )}
      {getValues(name) && (
        <div className="flex items-center gap-2">
          {/* 타입이 password일때는 show password toggle 버튼 노출 */}
          {type === 'password' && (
            <>
              {isShowPwd ? (
                <ViewSvg
                  className="mr-2 text-hr-gray-50"
                  width={iconSize[size]}
                  height={iconSize[size]}
                  onClick={() => !disabled && setIsShowPwd(!isShowPwd)}
                />
              ) : (
                <ViewHideSvg
                  className="mr-2 text-hr-gray-50"
                  width={iconSize[size]}
                  height={iconSize[size]}
                  onClick={() => !disabled && setIsShowPwd(!isShowPwd)}
                />
              )}
            </>
          )}

          {/* disabled상태가 아닐때는 값 삭제 버튼 노출 */}
          {!disabled && (
            <>
              {!closeBtnHidden && (
                // <CloseSvg
                //   className="cursor-pointer"
                //   width={iconSize[size]}
                //   height={iconSize[size]}
                //   onClick={() => {
                //     if (disabled) return;
                //     setValue(name, (resetValue ?? '') as PathValue<TFormValues, Path<TFormValues>>);
                //   }}
                // />
                <CloseSvg
              className="cursor-pointer"
              width={iconSize[size]}
              height={iconSize[size]}
              onClick={() => {
                if (!disabled) {
                  resetField(name);   // 해당 필드를 빈값(또는 defaultValue)로 리셋
                }
              }}
            />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

const sizeClasses = {
  lg: 'h-[56px] text-hr-b1 rounded-lg px-4 font-hr-regular placeholder-16px gap-2',
  md: 'h-12 text-hr-b2 rounded-lg px-4 font-hr-regular placeholder-16px gap-2',
  xs: 'h-9  text-hr-b5 rounded-md px-3 font-hr-regular placeholder-12px gap-1',
};

const iconSize = {
  lg: 24,
  md: 20,
  xs: 16,
};

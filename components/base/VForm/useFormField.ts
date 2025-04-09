import { FieldContextKey, useFieldError, useIsFieldDirty, useIsFieldTouched, useIsFieldValid } from 'vee-validate';

export function useFormField() {
    const fieldContext = inject(FieldContextKey);

    if (!fieldContext)
        throw new Error('useFormField should be used within <VFormField>');

    const { name } = fieldContext;

    const fieldState = {
        valid: useIsFieldValid(name),
        isDirty: useIsFieldDirty(name),
        isTouched: useIsFieldTouched(name),
        error: useFieldError(name),
    };

    return {
        name,
        ...fieldState,
    };
}

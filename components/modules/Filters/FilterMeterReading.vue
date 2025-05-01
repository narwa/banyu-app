<script setup lang="ts">
import type { MeterReadingPaginationSearchParams } from '~/models/params/MeterReadingPaginationSearchParams';
import { useQueryAreaList } from '~/composables/area/queries/useQueryAreaList';
import { useQueryMemberList } from '~/composables/member/queries/useQueryMemberList';
import { METER_READING_STATUS, MONTH } from '~/constants';
import { AreaPaginationSearchParams } from '~/models/params/AreaPaginationSearchParams';
import { MemberPaginationSearchParams } from '~/models/params/MemberPaginationSearchParams';

const props = defineProps<{
    params: MeterReadingPaginationSearchParams;
}>();

const filter = reactive(props.params);

const areaQueryParams = reactive(new AreaPaginationSearchParams());
const areaSearchCount = shallowRef<number>(0);
const memberQueryParams = reactive(new MemberPaginationSearchParams());
const memberSearchCount = shallowRef<number>(0);
const { results: areaList, isLoading: isLoadingAreaList } = useQueryAreaList(areaQueryParams, areaSearchCount);
const { results: memberList, isLoading: isLoadingMemberist } = useQueryMemberList(memberQueryParams, memberSearchCount);
const meterReadingStatusList = Object.values(METER_READING_STATUS).map((status) => {
    return {
        label: status,
        value: status,
    };
});
</script>

<template>
    <form>
        <VGrid
            type="cols"
            md="2"
            sm="1"
            gap="4"
            class="md:grid-cols-2 sm:grid-cols-1 pt-4"
        >
            <VMultiSelect
                v-model:model-value="filter.areaCode"
                name="areaCode"
                label="Pilih Kode Area"
                :options="areaList"
                placeholder="Mohon pilih kode area"
                size="lg"
                value-key="code"
                label-key="code"
                clearable
                :loading="isLoadingAreaList"
            />
            <VSelect
                v-model:model-value="filter.memberId"
                name="memberId"
                label="Pilih Member"
                :options="memberList"
                placeholder="Mohon pilih member"
                value-key="id"
                label-key="fullName"
                size="lg"
                clearable
                :loading="isLoadingMemberist"
            />
            <VInputDate
                v-model="filter.dateStart"
                placeholder="Masukan Tanggal Mulai"
                name="dateStart"
                label="Tanggal Mulai"
            />
            <VInputDate
                v-model="filter.dateEnd"
                placeholder="Masukan Tanggal Berakhir"
                name="dateEnd"
                label="Tanggal Berakhir"
            />
            <VSelect
                v-model:model-value="filter.year"
                name="year"
                label="Pilih Tahun"
                :options="generateYears()"
                placeholder="Mohon pilih tahun"
                value-key="value"
                label-key="label"
                size="lg"
                clearable
            />
            <VSelect
                v-model:model-value="filter.month"
                name="month"
                label="Pilih Bulan"
                :options="MONTH"
                placeholder="Mohon pilih bulan"
                value-key="value"
                label-key="label"
                size="lg"
                clearable
            />
            <VSelect
                v-model:model-value="filter.status"
                name="status"
                label="Pilih Status"
                :options="meterReadingStatusList"
                placeholder="Mohon pilih status"
                value-key="value"
                label-key="label"
                size="lg"
                clearable
            />
        </VGrid>
    </form>
</template>

import * as React from 'react';
import { useAsyncEffect, useReactive } from 'ahooks';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const cols = [
	{
		field: 'name',
		headerName: 'Name',
		flex: 1,
	},
];

export default function ColumnSpanningFunction() {
	const [pokemon, setPokemon] = React.useState([]);

	const dataGridState = useReactive({
		amount: 0,
		pageSize: 10,
		offset: 0,
		page: 0,
	});

	const refresh = async () => {
		console.log('refresh is being used');
		const returnedValues = await fetchPokemon(dataGridState.pageSize, dataGridState.offset);

		const changed = returnedValues.results.map((value, id) => {
			return { ...value, id: value.url };
		});
		dataGridState.amount = returnedValues.count;
		setPokemon(changed);
	};

	const onPageChange = (newPage) => {
		console.log('newPage: ', newPage);
		dataGridState.offset = newPage * dataGridState.pageSize;
		dataGridState.page = newPage;
		refresh();
	};

	useAsyncEffect(async () => {
		await refresh();
	}, []);

	return (
		<Box sx={{ width: '100%' }}>
			<DataGrid
				autoHeight
				columns={cols}
				rowCount={dataGridState.amount}
				rows={pokemon}
				pagination
				paginationMode="server"
				page={dataGridState.page}
				pageSize={dataGridState.pageSize}
				rowsPerPageOptions={[dataGridState.pageSize]}
				onPageChange={onPageChange}
			/>
		</Box>
	);
}

const fetchPokemon = async (limit, offset) => {
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
	console.log('one fetchPokemon | limit: ', limit, ' | offset: ', offset);
	const data = await response.json();
	console.log(data);
	return {
		results: data.results,
		count: data.count,
	};
};

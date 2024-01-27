import type { SizeProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperTitle, wrapperDescription, wrapperTable, wrapperBtn } = styles;

export const Size = ({ handleToggle }: SizeProps) => {
	return (
		<div className={wrapper}>
			<h3 className={wrapperTitle}>Size Guide</h3>
			<p className={wrapperDescription}>
				You can use our size guides as a general reference to determine your size. Each design will
				have a distinct set of measurements because our shapes range from slim-fitting to large. You
				can always get in touch with our support team if you have queries about the measurements of
				a certain model to ensure a great fit. We can assist you if you include your breast, waist,
				high hip, and low hip measurements with your comment.
			</p>
			<div className={wrapperTable}>
				<table>
					<tbody>
						<tr>
							<td>
								<b>Mens</b>
							</td>
							<td>
								<b>Small</b>
							</td>
							<td>
								<b>Medium</b>
							</td>
							<td>
								<b>Large</b>
							</td>
							<td>
								<b>X-Large</b>
							</td>
							<td>
								<b>XX-Large</b>
							</td>
						</tr>
						<tr>
							<td>Neck</td>
							<td>14-14.5</td>
							<td>15-15.5</td>
							<td>16-16.5</td>
							<td>17-17.5</td>
							<td>18-18.5</td>
						</tr>
						<tr>
							<td>Chest</td>
							<td>35-37</td>
							<td>38-40</td>
							<td>41-43</td>
							<td>44-46</td>
							<td>47-49</td>
						</tr>
						<tr>
							<td>Sleeve</td>
							<td>32-33</td>
							<td>33-34</td>
							<td>34-35</td>
							<td>35-36</td>
							<td>36-36.5</td>
						</tr>
						<tr>
							<td>Waist</td>
							<td>29-31</td>
							<td>32-34</td>
							<td>35-37</td>
							<td>38-40</td>
							<td>41-43</td>
						</tr>
						<tr>
							<td>Neck</td>
							<td>14-14.5</td>
							<td>15-15.5</td>
							<td>16-16.5</td>
							<td>17-17.5</td>
							<td>18-18.5</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className={wrapperBtn}>
				<button onClick={handleToggle}>Close</button>
			</div>
		</div>
	);
};

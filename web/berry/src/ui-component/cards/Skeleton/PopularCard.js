// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// project imports
import { gridSpacing } from 'store/constant';

// ==============================|| SKELETON - POPULAR CARD ||============================== //<Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                <Grid item xs={6}>
                  <Skeleton variant="rectangular" height={20} />
                </Grid>
                <Grid item xs={6}>
                  <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                    <Grid item xs zeroMinWidth>
                      <Skeleton variant="rectangular" height={20} />
                    </Grid>
                    <Grid item>
                      <Skeleton variant="rectangular" height={16} width={16} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" height={20} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                <Grid item xs={6}>
                  <Skeleton variant="rectangular" height={20} />
                </Grid>
                <Grid item xs={6}>
                  <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
                    <Grid item xs zeroMinWidth>
                      <Skeleton variant="rectangular" height={20} />
                    </Grid>
                    <Grid item>
                      <Skeleton variant="rectangular" height={16} width={16} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" height={20} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}><Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
  <Grid item xs={6}>
    <Skeleton variant="rectangular" height={20} />
  </Grid>
  <Grid item xs={6}>
    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
      <Grid item xs zeroMinWidth>
        <Skeleton variant="rectangular" height={20} />
      </Grid>
      <Grid item>
        <Skeleton variant="rectangular" height={16} width={16} />
      </Grid>
    </Grid>
  </Grid>
</Grid>
<Grid item xs={6}>
  <Skeleton variant="rectangular" height={20} />
</Grid>
</Grid>
<Grid item xs={12}>
<Grid container spacing={1}>
  <Grid item xs={12}>
    <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
      <Grid item xs={6}>
        <Skeleton variant="rectangular" height={20} />
      </Grid>
      <Grid item xs={6}>
        <Grid container alignItems="center" spacing={gridSpacing} justifyContent="space-between">
          <Grid item xs zeroMinWidth>
            <Skeleton variant="rectangular" height={20} />
          </Grid>
          <Grid item>
            <Skeleton variant="rectangular" height={16} width={16} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
  <Grid item xs={6}>
    <Skeleton variant="rectangular" height={20} />
  </Grid>
</Grid>
</Grid>```javascript
<Skeleton variant="rectangular" height={25} width={75} />
    </CardContent>
  </Card>
);

export default PopularCard;
```
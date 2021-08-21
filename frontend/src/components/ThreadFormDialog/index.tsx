import {FunctionComponent, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    TextField
} from "@material-ui/core";
import Account from "../../api/entities/Account";
import Thread from "../../api/entities/Thread";
import AddIcon from "@material-ui/icons/Add";
import {TweetStatus} from "../../api/entities/Tweet";

export type ThreadFormProps = {
    open: boolean
    account: Account
    initial: Thread
    onSubmit: (thread: Thread) => void
}

class CustomDate extends Date {
    constructor(date?: Date) {
        super(date ? date : new Date())
    }

    public toLocalISOString(milliseconds: boolean = true,
                            timezone: boolean = true): string {
        let result =
            this.getFullYear() + "-" +
            (String(this.getMonth()).padStart(2, "0")) + "-" +
            (String(this.getDay()).padStart(2, "0")) + "T" +
            (String(this.getHours()).padStart(2, "0")) + ":" +
            (String(this.getMinutes()).padStart(2, "0")) + ":" +
            (String(this.getSeconds()).padStart(2, "0"))
        if (milliseconds) {
            result += "." + (String(this.getMilliseconds()).padStart(3, "0"))
        }
        if (timezone) {
            const offset = -this.getTimezoneOffset()
            const hourOffset = Math.floor(Math.abs(offset) / 60)
            const minuteOffset = offset % 60
            result +=
                (offset > 0 ? "+" : "-") +
                (String(hourOffset).padStart(2, "0")) +
                (String(minuteOffset).padStart(2, "0"))
        }

        return result
    }
}

const Index: FunctionComponent<ThreadFormProps> = ({open, account, initial, onSubmit}) => {
    const [thread, setThread] = useState<Thread>(initial)

    return (
        <Dialog open={open}>
            <DialogTitle title={"Thread"}/>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="datetime-local"
                            label="Scheduled For"
                            type="datetime-local"
                            value={
                                new CustomDate(thread.scheduled_for).toLocalISOString(false, false)
                            }
                            onChange={event => {
                                setThread({
                                    ...thread,
                                    scheduled_for: new Date(event.target.value)
                                })
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    {
                        thread.tweets.map((tweet, index) => (
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label={"Tweet " + (index + 1)}
                                    multiline
                                    rows={3}
                                    value={tweet.text}
                                    onChange={event => {
                                        thread.tweets[index].text = event.target.value
                                        setThread({
                                            ...thread
                                        })
                                    }}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                        ))
                    }
                    <Grid item xs={12}>
                        <IconButton aria-label="add" onClick={() => {
                            thread.tweets.push({
                                id: "",
                                text: "",
                                status: TweetStatus.SCHEDULED,
                                tweet_id: null,
                                error: null
                            })
                            setThread({
                                ...thread
                            })
                        }}>
                            <AddIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    onSubmit(thread)
                }} color="primary">
                    Save changes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Index
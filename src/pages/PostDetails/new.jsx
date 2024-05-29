{post?.proof?.map((item, i) => (
    <div key={i} className="my-3">
      <h5 className="text-muted">{item.question}</h5>
      {item.type === "text" ? (
        <Form.Group className="my-3" controlId={`textarea_${i}`}>
          <Form.Control
            size="lg"
            placeholder="Give answer"
            as="textarea"
            rows={3}
            value={data?.proof[i]?.title || ""}
            onChange={(e) =>
              setData({
                ...data,
                proof: {
                  ...data?.proof,
                  [i]: {
                    ...data.proof[i],
                    title: e.target.value,
                    image: "",
                  },
                },
              })
            }
          />
        </Form.Group>
      ) : (
        <>
          <img
            width="100%"
            className="m-auto mb-3 img-fluid rounded responsive-image"
            height={30}
            src={
              data?.proof[i]?.image instanceof File
                ? URL.createObjectURL(data?.proof[i]?.image)
                : "https://i.ibb.co/4g2RtSS/abstract-blue-geometric-shapes-background-1035-17545.webp"
            }
            alt="hotel"
          />
          {/* <img
            width="100%"
            className="m-auto  mb-3 img-fluid rounded"
            height={30}
            src={
              data?.proof[i]?.image instanceof File
                ? URL.createObjectURL(data?.proof[i]?.image)
                : "https://i.ibb.co/4g2RtSS/abstract-blue-geometric-shapes-background-1035-17545.webp"
            }
            alt="hotel"
          /> */}
          <Form.Group className="my-3" controlId={`file_${i}`}>
            <Form.Control
              size="lg"
              type="file"
              onChange={(e) =>
                setData({
                  ...data,
                  proof: {
                    ...data.proof,
                    [i]: {
                      ...data.proof[i],
                      image: e.target.files[0],
                      title: "gggg",
                    },
                  },
                })
              }
            />
          </Form.Group>
        </>
      )}
    </div>
  ))}